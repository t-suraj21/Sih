import Hotel from '../models/Hotel.js';
import { redis } from '../config/database.js';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { externalHotelApiService } from '../services/externalHotelApi.service.js';

// Search Hotels
export const searchHotels = asyncHandler(async (req, res) => {
  const {
    city,
    state,
    checkIn,
    checkOut,
    guests = 2,
    rooms = 1,
    minPrice,
    maxPrice,
    rating,
    amenities,
    page = 1,
    limit = 20,
    sortBy = 'rating',
    sortOrder = 'desc'
  } = req.query;

  try {
    // Check cache first
    const cacheKey = `hotels:search:${JSON.stringify(req.query)}`;
    const cachedResults = await redis.get(cacheKey);

    if (cachedResults) {
      return res.json(new ApiResponse(200, cachedResults, 'Hotels retrieved from cache'));
    }

    let hotels = [];
    let totalCount = 0;
    let source = 'local';

    // Try external API first if city is provided
    if (city) {
      console.log(`Searching external API for city: ${city}`);
      const externalResult = await externalHotelApiService.searchHotels(city);
      
      if (externalResult.success && externalResult.data.length > 0) {
        hotels = externalResult.data;
        totalCount = externalResult.total;
        source = 'external';
        console.log(`Found ${totalCount} hotels from external API`);
      }
    }

    // Fallback to local database if external API fails or no results
    if (hotels.length === 0) {
      console.log('Falling back to local database search');
      
      // Build search query for local database
      const searchQuery = { isActive: true };

      if (city) {
        searchQuery.city = new RegExp(city, 'i');
      }

      if (state) {
        searchQuery.state = new RegExp(state, 'i');
      }

      if (minPrice || maxPrice) {
        searchQuery.price = {};
        if (minPrice) searchQuery.price.$gte = parseFloat(minPrice);
        if (maxPrice) searchQuery.price.$lte = parseFloat(maxPrice);
      }

      if (rating) {
        searchQuery.rating = { $gte: parseFloat(rating) };
      }

      if (amenities) {
        const amenitiesList = Array.isArray(amenities) ? amenities : [amenities];
        searchQuery.amenities = { $in: amenitiesList };
      }

      // Build sort object
      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Execute local search
      const [localHotels, localCount] = await Promise.all([
        Hotel.find(searchQuery)
          .sort(sortOptions)
          .skip(skip)
          .limit(parseInt(limit))
          .populate('owner', 'name email phone')
          .lean(),
        Hotel.countDocuments(searchQuery)
      ]);

      hotels = localHotels;
      totalCount = localCount;
      source = 'local';
      console.log(`Found ${totalCount} hotels from local database`);
    }

    // Apply filters to external API results if needed
    if (source === 'external') {
      if (minPrice || maxPrice) {
        hotels = hotels.filter(hotel => {
          const price = hotel.price || 0;
          return (!minPrice || price >= parseFloat(minPrice)) && 
                 (!maxPrice || price <= parseFloat(maxPrice));
        });
      }

      if (rating) {
        hotels = hotels.filter(hotel => {
          const hotelRating = parseFloat(hotel.rating) || 0;
          return hotelRating >= parseFloat(rating);
        });
      }

      if (amenities) {
        const amenitiesList = Array.isArray(amenities) ? amenities : [amenities];
        hotels = hotels.filter(hotel => {
          const hotelAmenities = hotel.amenities || [];
          return amenitiesList.some(amenity => 
            hotelAmenities.some(ha => ha.toLowerCase().includes(amenity.toLowerCase()))
          );
        });
      }

      // Apply sorting
      hotels.sort((a, b) => {
        let aValue = a[sortBy] || 0;
        let bValue = b[sortBy] || 0;
        
        if (sortBy === 'rating') {
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        }
        
        if (sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        } else {
          return aValue > bValue ? 1 : -1;
        }
      });

      // Apply pagination to filtered results
      totalCount = hotels.length;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      hotels = hotels.slice(skip, skip + parseInt(limit));
    }

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    const result = {
      hotels,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      },
      filters: {
        city,
        state,
        minPrice,
        maxPrice,
        rating,
        amenities
      },
      source
    };

    // Cache results for 10 minutes
    await redis.set(cacheKey, result, config.cacheTtl.searchResults || 600);

    res.json(new ApiResponse(200, result, `Found ${totalCount} hotels from ${source} source`));

  } catch (error) {
    console.error('Hotel search error:', error);
    throw new ApiError(500, 'Failed to search hotels');
  }
});

// Get Hotel Details
export const getHotelDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, 'Hotel ID is required');
  }

  // Check cache first
  const cacheKey = `hotel:${id}`;
  const cachedHotel = await redis.get(cacheKey);

  if (cachedHotel) {
    return res.json(new ApiResponse(200, { hotel: cachedHotel }, 'Hotel details retrieved from cache'));
  }

  let hotel = null;
  let source = 'local';

  // Check if this is an external API hotel (starts with 'ext_')
  if (id.startsWith('ext_') || id.startsWith('fallback_')) {
    console.log(`Fetching external hotel details for ID: ${id}`);
    
    // For external hotels, we need to know the city to search
    // We'll try common cities or extract from the request
    const city = req.query.city || 'london'; // Default to london
    
    const externalResult = await externalHotelApiService.getHotelDetails(id, city);
    
    if (externalResult.success) {
      hotel = externalResult.data;
      source = 'external';
      console.log(`Found external hotel: ${hotel.name}`);
    }
  } else {
    // Try local database first
    hotel = await Hotel.findById(id)
      .populate('owner', 'name email phone')
      .lean();

    if (hotel) {
      source = 'local';
    }
  }

  if (!hotel) {
    throw new ApiError(404, 'Hotel not found');
  }

  if (source === 'local' && !hotel.isActive) {
    throw new ApiError(404, 'Hotel is not available');
  }

  // Add source information to hotel data
  hotel.source = source;

  // Cache hotel details for 30 minutes
  await redis.set(cacheKey, hotel, config.cacheTtl.hotels || 1800);

  res.json(new ApiResponse(200, { hotel }, `Hotel details retrieved successfully from ${source} source`));
});

// Get Hotels by Location
export const getHotelsByLocation = asyncHandler(async (req, res) => {
  const { latitude, longitude, radius = 10 } = req.query;

  if (!latitude || !longitude) {
    throw new ApiError(400, 'Latitude and longitude are required');
  }

  const hotels = await Hotel.find({
    isActive: true,
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        $maxDistance: parseFloat(radius) * 1000 // Convert km to meters
      }
    }
  })
  .populate('owner', 'name email phone')
  .limit(50)
  .lean();

  res.json(new ApiResponse(200, { hotels }, `Found ${hotels.length} hotels within ${radius}km`));
});

// Get Popular Hotels
export const getPopularHotels = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  // Check cache first
  const cacheKey = `hotels:popular:${limit}`;
  const cachedHotels = await redis.get(cacheKey);

  if (cachedHotels) {
    return res.json(new ApiResponse(200, { hotels: cachedHotels }, 'Popular hotels retrieved from cache'));
  }

  const hotels = await Hotel.find({ isActive: true })
    .sort({ rating: -1, reviewCount: -1 })
    .limit(parseInt(limit))
    .populate('owner', 'name email phone')
    .lean();

  // Cache for 1 hour
  await redis.set(cacheKey, hotels, 60 * 60);

  res.json(new ApiResponse(200, { hotels }, 'Popular hotels retrieved successfully'));
});

// Add Hotel (Vendor/Admin only)
export const addHotel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userRole = req.user.role;

  const hotelData = {
    ...req.body,
    owner: userId
  };

  // Validate required fields
  const requiredFields = ['name', 'city', 'state', 'address', 'price'];
  const missingFields = requiredFields.filter(field => !hotelData[field]);

  if (missingFields.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missingFields.join(', ')}`);
  }

  // Set verification status based on user role
  if (userRole === 'admin') {
    hotelData.verified = true;
  }

  const hotel = await Hotel.create(hotelData);

  // Populate owner details
  await hotel.populate('owner', 'name email phone');

  // Clear related caches
  await redis.del('hotels:popular:*');

  res.status(201).json(new ApiResponse(201, { hotel }, 'Hotel added successfully'));
});

// Update Hotel (Owner/Admin only)
export const updateHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;

  const hotel = await Hotel.findById(id);

  if (!hotel) {
    throw new ApiError(404, 'Hotel not found');
  }

  // Check permissions
  if (userRole !== 'admin' && hotel.owner.toString() !== userId.toString()) {
    throw new ApiError(403, 'You can only update your own hotels');
  }

  // Update hotel
  const updatedHotel = await Hotel.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  ).populate('owner', 'name email phone');

  // Clear caches
  await redis.del(`hotel:${id}`);
  await redis.del('hotels:popular:*');

  res.json(new ApiResponse(200, { hotel: updatedHotel }, 'Hotel updated successfully'));
});

// Delete Hotel (Owner/Admin only)
export const deleteHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;

  const hotel = await Hotel.findById(id);

  if (!hotel) {
    throw new ApiError(404, 'Hotel not found');
  }

  // Check permissions
  if (userRole !== 'admin' && hotel.owner.toString() !== userId.toString()) {
    throw new ApiError(403, 'You can only delete your own hotels');
  }

  // Soft delete by setting isActive to false
  await Hotel.findByIdAndUpdate(id, { isActive: false });

  // Clear caches
  await redis.del(`hotel:${id}`);
  await redis.del('hotels:popular:*');

  res.json(new ApiResponse(200, null, 'Hotel deleted successfully'));
});

// Get Vendor Hotels
export const getVendorHotels = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userRole = req.user.role;
  const { page = 1, limit = 20, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  // Build query
  let query = {};
  
  // If not admin, only show user's own hotels
  if (userRole !== 'admin') {
    query.owner = userId;
  }
  
  if (status) {
    query.isActive = status === 'active';
  }

  // Build sort
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [hotels, totalCount] = await Promise.all([
    Hotel.find(query)
      .populate('owner', 'name email phone')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Hotel.countDocuments(query)
  ]);

  const totalPages = Math.ceil(totalCount / parseInt(limit));

  res.json(new ApiResponse(200, {
    hotels,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalCount,
      hasNextPage: parseInt(page) < totalPages,
      hasPrevPage: parseInt(page) > 1,
      limit: parseInt(limit)
    }
  }, 'Vendor hotels retrieved successfully'));
});

// Get Hotel Stats (Owner/Admin only)
export const getHotelStats = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;

  const hotel = await Hotel.findById(id);

  if (!hotel) {
    throw new ApiError(404, 'Hotel not found');
  }

  // Check permissions
  if (userRole !== 'admin' && hotel.owner.toString() !== userId.toString()) {
    throw new ApiError(403, 'You can only view stats for your own hotels');
  }

  // Get booking statistics
  const Booking = (await import('../models/Booking.js')).default;
  const Review = (await import('../models/Review.js')).default;

  const [bookingStats, reviewStats] = await Promise.all([
    Booking.aggregate([
      { $match: { hotel: hotel._id } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$pricing.totalAmount' },
          confirmedBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
          },
          cancelledBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          }
        }
      }
    ]),
    Review.aggregate([
      { $match: { hotel: hotel._id, status: 'approved' } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating.overall' },
          ratingDistribution: {
            $push: '$rating.overall'
          }
        }
      }
    ])
  ]);

  const stats = {
    hotel: {
      id: hotel._id,
      name: hotel.name,
      rating: hotel.rating,
      reviewCount: hotel.reviewCount
    },
    bookings: bookingStats[0] || {
      totalBookings: 0,
      totalRevenue: 0,
      confirmedBookings: 0,
      cancelledBookings: 0
    },
    reviews: reviewStats[0] || {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: []
    }
  };

  res.json(new ApiResponse(200, { stats }, 'Hotel statistics retrieved successfully'));
});
