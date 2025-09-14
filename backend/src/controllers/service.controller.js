import Service from '../models/Service.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get all services (public)
export const getAllServices = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    type,
    location,
    minPrice,
    maxPrice,
    rating,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter
  const filter = { status: 'active' };

  if (type) filter.type = type;
  if (location) {
    filter.$or = [
      { 'location.city': { $regex: location, $options: 'i' } },
      { 'location.state': { $regex: location, $options: 'i' } }
    ];
  }
  if (minPrice || maxPrice) {
    filter['pricing.basePrice'] = {};
    if (minPrice) filter['pricing.basePrice'].$gte = parseFloat(minPrice);
    if (maxPrice) filter['pricing.basePrice'].$lte = parseFloat(maxPrice);
  }
  if (rating) filter['ratings.average'] = { $gte: parseFloat(rating) };
  if (search) {
    filter.$text = { $search: search };
  }

  // Build sort
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  const skip = (page - 1) * limit;
  
  const [services, totalServices] = await Promise.all([
    Service.find(filter)
      .populate('vendor', 'name email phone')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)),
    Service.countDocuments(filter)
  ]);

  const pagination = {
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalServices / limit),
    totalServices,
    hasNextPage: page < Math.ceil(totalServices / limit),
    hasPrevPage: page > 1,
    limit: parseInt(limit)
  };

  res.json(
    new ApiResponse(200, { services, pagination }, 'Services retrieved successfully')
  );
});

// Get service by ID
export const getServiceById = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  
  const service = await Service.findById(serviceId)
    .populate('vendor', 'name email phone kycVerified');
  
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  // Increment view count
  service.stats.views++;
  await service.save();

  res.json(
    new ApiResponse(200, { service }, 'Service retrieved successfully')
  );
});

// Create service (vendor only)
export const createService = asyncHandler(async (req, res) => {
  const serviceData = {
    ...req.body,
    vendor: req.user._id
  };

  const service = await Service.create(serviceData);
  await service.populate('vendor', 'name email phone');

  res.status(201).json(
    new ApiResponse(201, { service }, 'Service created successfully')
  );
});

// Update service (vendor/admin)
export const updateService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const updates = req.body;

  const service = await Service.findById(serviceId);
  
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  // Check ownership (vendors can only update their own services)
  if (req.user.role === 'vendor' && service.vendor.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only update your own services');
  }

  Object.assign(service, updates);
  await service.save();
  await service.populate('vendor', 'name email phone');

  res.json(
    new ApiResponse(200, { service }, 'Service updated successfully')
  );
});

// Delete service (vendor/admin)
export const deleteService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;

  const service = await Service.findById(serviceId);
  
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  // Check ownership
  if (req.user.role === 'vendor' && service.vendor.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only delete your own services');
  }

  await Service.findByIdAndDelete(serviceId);

  res.json(
    new ApiResponse(200, null, 'Service deleted successfully')
  );
});

// Get vendor's services
export const getVendorServices = asyncHandler(async (req, res) => {
  const vendorId = req.params.vendorId || req.user._id;
  const { page = 1, limit = 10, status } = req.query;

  // Check if user can access this vendor's services
  if (req.user.role === 'vendor' && vendorId !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only access your own services');
  }

  const filter = { vendor: vendorId };
  if (status) filter.status = status;

  const skip = (page - 1) * limit;
  
  const [services, totalServices] = await Promise.all([
    Service.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Service.countDocuments(filter)
  ]);

  const pagination = {
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalServices / limit),
    totalServices,
    hasNextPage: page < Math.ceil(totalServices / limit),
    hasPrevPage: page > 1,
    limit: parseInt(limit)
  };

  res.json(
    new ApiResponse(200, { services, pagination }, 'Vendor services retrieved successfully')
  );
});

// Update service status (admin only)
export const updateServiceStatus = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const { status, reason } = req.body;

  const service = await Service.findById(serviceId);
  
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  service.status = status;
  
  if (status === 'active') {
    service.verification.isVerified = true;
    service.verification.verifiedAt = new Date();
    service.verification.verifiedBy = req.user._id;
  } else if (status === 'rejected' && reason) {
    service.rejectionReason = reason;
  }

  await service.save();
  await service.populate('vendor', 'name email phone');

  res.json(
    new ApiResponse(200, { service }, `Service ${status} successfully`)
  );
});

// Get service statistics
export const getServiceStats = asyncHandler(async (req, res) => {
  const vendorId = req.user.role === 'vendor' ? req.user._id : null;
  
  const matchStage = vendorId ? { vendor: vendorId } : {};

  const stats = await Service.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalServices: { $sum: 1 },
        activeServices: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        },
        pendingServices: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        totalBookings: { $sum: '$stats.bookings' },
        totalRevenue: { $sum: '$stats.revenue' },
        averageRating: { $avg: '$ratings.average' },
        totalViews: { $sum: '$stats.views' }
      }
    }
  ]);

  const serviceStats = stats[0] || {
    totalServices: 0,
    activeServices: 0,
    pendingServices: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalViews: 0
  };

  // Get services by type
  const servicesByType = await Service.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        avgRating: { $avg: '$ratings.average' },
        totalBookings: { $sum: '$stats.bookings' }
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.json(
    new ApiResponse(200, {
      stats: serviceStats,
      servicesByType
    }, 'Service statistics retrieved successfully')
  );
});

// Search services with advanced filters
export const searchServices = asyncHandler(async (req, res) => {
  const {
    q, // search query
    type,
    city,
    state,
    minPrice,
    maxPrice,
    rating,
    amenities,
    sortBy = 'relevance',
    page = 1,
    limit = 12
  } = req.query;

  const pipeline = [];

  // Match stage
  const matchConditions = { status: 'active' };

  if (q) {
    matchConditions.$text = { $search: q };
  }
  if (type) matchConditions.type = type;
  if (city) matchConditions['location.city'] = { $regex: city, $options: 'i' };
  if (state) matchConditions['location.state'] = { $regex: state, $options: 'i' };
  if (minPrice || maxPrice) {
    matchConditions['pricing.basePrice'] = {};
    if (minPrice) matchConditions['pricing.basePrice'].$gte = parseFloat(minPrice);
    if (maxPrice) matchConditions['pricing.basePrice'].$lte = parseFloat(maxPrice);
  }
  if (rating) matchConditions['ratings.average'] = { $gte: parseFloat(rating) };
  if (amenities) {
    const amenitiesList = amenities.split(',');
    matchConditions['features.amenities'] = { $in: amenitiesList };
  }

  pipeline.push({ $match: matchConditions });

  // Add score for text search
  if (q) {
    pipeline.push({ $addFields: { score: { $meta: 'textScore' } } });
  }

  // Sort stage
  let sortStage = {};
  switch (sortBy) {
    case 'price_low':
      sortStage = { 'pricing.basePrice': 1 };
      break;
    case 'price_high':
      sortStage = { 'pricing.basePrice': -1 };
      break;
    case 'rating':
      sortStage = { 'ratings.average': -1 };
      break;
    case 'popularity':
      sortStage = { 'stats.bookings': -1 };
      break;
    case 'newest':
      sortStage = { createdAt: -1 };
      break;
    case 'relevance':
    default:
      if (q) {
        sortStage = { score: { $meta: 'textScore' } };
      } else {
        sortStage = { 'stats.bookings': -1 };
      }
  }
  pipeline.push({ $sort: sortStage });

  // Pagination
  const skip = (page - 1) * limit;
  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: parseInt(limit) });

  // Populate vendor info
  pipeline.push({
    $lookup: {
      from: 'users',
      localField: 'vendor',
      foreignField: '_id',
      as: 'vendor',
      pipeline: [{ $project: { name: 1, email: 1, phone: 1, kycVerified: 1 } }]
    }
  });
  pipeline.push({ $unwind: '$vendor' });

  const [services, totalCount] = await Promise.all([
    Service.aggregate(pipeline),
    Service.countDocuments(matchConditions)
  ]);

  const pagination = {
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalCount / limit),
    totalServices: totalCount,
    hasNextPage: page < Math.ceil(totalCount / limit),
    hasPrevPage: page > 1,
    limit: parseInt(limit)
  };

  res.json(
    new ApiResponse(200, { services, pagination }, 'Services search completed')
  );
});

export default {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getVendorServices,
  updateServiceStatus,
  getServiceStats,
  searchServices
};
