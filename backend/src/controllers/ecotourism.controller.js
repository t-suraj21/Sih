import EcoTourism from '../models/EcoTourism.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get all eco-tourism options with filtering and pagination
export const getEcoTourismOptions = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    type,
    category,
    state,
    region,
    minRating,
    maxPrice,
    minPrice,
    ecoRating,
    carbonFootprint,
    featured,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter object
  const filter = { isActive: true };

  if (type) filter.type = type;
  if (category) filter.category = category;
  if (state) filter['location.state'] = state;
  if (region) filter['location.region'] = region;
  if (minRating) filter['ratings.overall'] = { $gte: parseFloat(minRating) };
  if (ecoRating) filter['sustainability.ecoRating'] = { $gte: parseFloat(ecoRating) };
  if (carbonFootprint) filter['sustainability.carbonFootprint'] = carbonFootprint;
  if (featured !== undefined) filter.featured = featured === 'true';

  // Price filtering
  if (minPrice || maxPrice) {
    filter['pricing.basePrice'] = {};
    if (minPrice) filter['pricing.basePrice'].$gte = parseFloat(minPrice);
    if (maxPrice) filter['pricing.basePrice'].$lte = parseFloat(maxPrice);
  }

  // Text search
  if (search) {
    filter.$text = { $search: search };
  }

  // Build sort object
  const sort = {};
  if (search) {
    sort.score = { $meta: 'textScore' };
  } else {
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  }

  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [ecoOptions, total] = await Promise.all([
      EcoTourism.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('reviews', 'rating comment user createdAt')
        .lean(),
      EcoTourism.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json(
      new ApiResponse(200, {
        ecoOptions,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }, 'Eco-tourism options fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching eco-tourism options');
  }
});

// Get single eco-tourism option by ID or slug
export const getEcoTourismById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {
    const ecoOption = await EcoTourism.findOne({
      $or: [
        { _id: id },
        { slug: id }
      ],
      isActive: true
    }).populate('reviews', 'rating comment user createdAt');

    if (!ecoOption) {
      throw new ApiError(404, 'Eco-tourism option not found');
    }

    res.status(200).json(
      new ApiResponse(200, ecoOption, 'Eco-tourism option fetched successfully')
    );
  } catch (error) {
    if (error.name === 'CastError') {
      throw new ApiError(404, 'Eco-tourism option not found');
    }
    throw error;
  }
});

// Get featured eco-tourism options
export const getFeaturedEcoTourism = asyncHandler(async (req, res) => {
  const { limit = 6, type } = req.query;

  const filter = { 
    isActive: true, 
    featured: true,
    verified: true
  };

  if (type) filter.type = type;

  try {
    const featuredOptions = await EcoTourism.find(filter)
      .sort({ 'ratings.overall': -1, popularityScore: -1 })
      .limit(parseInt(limit))
      .lean();

    res.status(200).json(
      new ApiResponse(200, featuredOptions, 'Featured eco-tourism options fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching featured eco-tourism options');
  }
});

// Get eco-tourism by category
export const getEcoTourismByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { limit = 8, page = 1 } = req.query;

  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [ecoOptions, total] = await Promise.all([
      EcoTourism.find({ 
        category, 
        isActive: true 
      })
        .sort({ 'ratings.overall': -1, featured: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      EcoTourism.countDocuments({ category, isActive: true })
    ]);

    res.status(200).json(
      new ApiResponse(200, {
        ecoOptions,
        total,
        category
      }, `Eco-tourism options in ${category} category fetched successfully`)
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching eco-tourism options by category');
  }
});

// Get eco-tourism statistics
export const getEcoTourismStats = asyncHandler(async (req, res) => {
  try {
    const stats = await EcoTourism.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalOptions: { $sum: 1 },
          avgEcoRating: { $avg: '$sustainability.ecoRating' },
          totalTreesPlanted: { $sum: '$sustainability.conservationImpact.treesPlanted' },
          totalCO2Reduced: { $sum: '$sustainability.conservationImpact.co2Reduced' },
          totalCommunitiesSupported: { $sum: '$sustainability.conservationImpact.communitiesSupported' },
          avgRating: { $avg: '$ratings.overall' }
        }
      }
    ]);

    const categoryStats = await EcoTourism.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgRating: { $avg: '$ratings.overall' },
          avgEcoRating: { $avg: '$sustainability.ecoRating' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const typeStats = await EcoTourism.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          avgPrice: { $avg: '$pricing.basePrice' }
        }
      }
    ]);

    res.status(200).json(
      new ApiResponse(200, {
        overview: stats[0] || {},
        byCategory: categoryStats,
        byType: typeStats
      }, 'Eco-tourism statistics fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching eco-tourism statistics');
  }
});

// Search eco-tourism options
export const searchEcoTourism = asyncHandler(async (req, res) => {
  const { 
    q: query, 
    location, 
    type, 
    category,
    minEcoRating,
    carbonFootprint,
    limit = 10 
  } = req.query;

  if (!query && !location) {
    throw new ApiError(400, 'Search query or location is required');
  }

  const searchFilter = { isActive: true };

  // Text search
  if (query) {
    searchFilter.$text = { $search: query };
  }

  // Location search
  if (location) {
    searchFilter.$or = [
      { 'location.city': new RegExp(location, 'i') },
      { 'location.state': new RegExp(location, 'i') },
      { 'location.region': new RegExp(location, 'i') }
    ];
  }

  // Additional filters
  if (type) searchFilter.type = type;
  if (category) searchFilter.category = category;
  if (minEcoRating) searchFilter['sustainability.ecoRating'] = { $gte: parseFloat(minEcoRating) };
  if (carbonFootprint) searchFilter['sustainability.carbonFootprint'] = carbonFootprint;

  try {
    const results = await EcoTourism.find(searchFilter)
      .sort(query ? { score: { $meta: 'textScore' } } : { 'ratings.overall': -1 })
      .limit(parseInt(limit))
      .lean();

    res.status(200).json(
      new ApiResponse(200, results, 'Search results fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error performing search');
  }
});

// Get eco-tourism options near a location
export const getNearbyEcoTourism = asyncHandler(async (req, res) => {
  const { latitude, longitude, radius = 50, limit = 10, type } = req.query;

  if (!latitude || !longitude) {
    throw new ApiError(400, 'Latitude and longitude are required');
  }

  const filter = { 
    isActive: true,
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        $maxDistance: parseInt(radius) * 1000 // Convert km to meters
      }
    }
  };

  if (type) filter.type = type;

  try {
    const nearbyOptions = await EcoTourism.find(filter)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json(
      new ApiResponse(200, nearbyOptions, 'Nearby eco-tourism options fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching nearby eco-tourism options');
  }
});

// Create new eco-tourism option (Admin only)
export const createEcoTourism = asyncHandler(async (req, res) => {
  try {
    const ecoOption = new EcoTourism(req.body);
    
    // Calculate eco points
    ecoOption.calculateEcoPoints();
    
    await ecoOption.save();

    res.status(201).json(
      new ApiResponse(201, ecoOption, 'Eco-tourism option created successfully')
    );
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(400, 'Eco-tourism option with this name already exists');
    }
    throw new ApiError(400, error.message);
  }
});

// Update eco-tourism option (Admin only)
export const updateEcoTourism = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const ecoOption = await EcoTourism.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!ecoOption) {
      throw new ApiError(404, 'Eco-tourism option not found');
    }

    // Recalculate eco points if sustainability data changed
    if (req.body.sustainability) {
      ecoOption.calculateEcoPoints();
      await ecoOption.save();
    }

    res.status(200).json(
      new ApiResponse(200, ecoOption, 'Eco-tourism option updated successfully')
    );
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

// Delete eco-tourism option (Admin only)
export const deleteEcoTourism = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const ecoOption = await EcoTourism.findByIdAndDelete(id);

    if (!ecoOption) {
      throw new ApiError(404, 'Eco-tourism option not found');
    }

    res.status(200).json(
      new ApiResponse(200, null, 'Eco-tourism option deleted successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error deleting eco-tourism option');
  }
});

// Toggle featured status (Admin only)
export const toggleFeatured = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const ecoOption = await EcoTourism.findById(id);

    if (!ecoOption) {
      throw new ApiError(404, 'Eco-tourism option not found');
    }

    ecoOption.featured = !ecoOption.featured;
    await ecoOption.save();

    res.status(200).json(
      new ApiResponse(200, ecoOption, `Eco-tourism option ${ecoOption.featured ? 'featured' : 'unfeatured'} successfully`)
    );
  } catch (error) {
    throw new ApiError(500, 'Error updating featured status');
  }
});
