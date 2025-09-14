import Attraction from '../models/Attraction.js';
import Destination from '../models/Destination.js';
import { redis } from '../config/database.js';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get All Attractions
export const getAllAttractions = asyncHandler(async (req, res) => {
  const { 
    destination, 
    category, 
    limit = 50, 
    page = 1, 
    sortBy = 'name', 
    sortOrder = 'asc',
    featured,
    minRating
  } = req.query;

  try {
    // Build search query
    const searchQuery = { isActive: true };

    if (destination) {
      const destinationDoc = await Destination.findOne({
        name: new RegExp(`^${destination}$`, 'i'),
        isActive: true
      }).select('_id');
      
      if (destinationDoc) {
        searchQuery.destination = destinationDoc._id;
      }
    }

    if (category) {
      searchQuery.category = new RegExp(category, 'i');
    }

    if (featured !== undefined) {
      searchQuery.featured = featured === 'true';
    }

    if (minRating) {
      searchQuery['ratings.overall'] = { $gte: parseFloat(minRating) };
    }

    // Build sort object
    const sortOptions = {};
    if (sortBy === 'rating') {
      sortOptions['ratings.overall'] = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'popularity') {
      sortOptions.isPopular = -1;
      sortOptions['ratings.overall'] = -1;
    } else if (sortBy === 'featured') {
      sortOptions.featured = -1;
      sortOptions['ratings.overall'] = -1;
    } else {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Check cache first
    const cacheKey = `attractions:all:${JSON.stringify({ destination, category, limit, page, sortBy, sortOrder, featured, minRating })}`;
    const cachedResults = await redis.get(cacheKey);

    if (cachedResults) {
      return res.json(new ApiResponse(200, cachedResults, 'Attractions retrieved from cache'));
    }

    // Execute search with population
    const [attractions, totalCount] = await Promise.all([
      Attraction.find(searchQuery)
        .populate('destination', 'name state region')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Attraction.countDocuments(searchQuery)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    const result = {
      attractions,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      },
      filters: {
        destination,
        category,
        featured,
        minRating
      }
    };

    // Cache results for 30 minutes
    await redis.set(cacheKey, result, config.cacheTtl.attractions);

    res.json(new ApiResponse(200, result, `Found ${totalCount} attractions`));

  } catch (error) {
    console.error('Get attractions error:', error);
    throw new ApiError(500, 'Failed to fetch attractions');
  }
});

// Get Attraction by ID
export const getAttractionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, 'Attraction ID is required');
  }

  try {
    // Check cache first
    const cacheKey = `attraction:${id}`;
    const cachedAttraction = await redis.get(cacheKey);

    if (cachedAttraction) {
      return res.json(new ApiResponse(200, { attraction: cachedAttraction }, 'Attraction retrieved from cache'));
    }

    // Find attraction by ID with population
    const attraction = await Attraction.findOne({
      _id: id,
      isActive: true
    })
      .populate('destination', 'name state region')
      .lean();

    if (!attraction) {
      throw new ApiError(404, 'Attraction not found');
    }

    // Cache attraction for 1 hour
    await redis.set(cacheKey, attraction, config.cacheTtl.attractions);

    res.json(new ApiResponse(200, { attraction }, 'Attraction retrieved successfully'));

  } catch (error) {
    console.error('Get attraction error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch attraction');
  }
});

// Search Attractions
export const searchAttractions = asyncHandler(async (req, res) => {
  const { q, destination, category, limit = 20, page = 1 } = req.query;

  if (!q || q.trim().length === 0) {
    throw new ApiError(400, 'Search query is required');
  }

  try {
    // Check cache first
    const cacheKey = `attractions:search:${q}:${destination || 'all'}:${category || 'all'}:${limit}:${page}`;
    const cachedResults = await redis.get(cacheKey);

    if (cachedResults) {
      return res.json(new ApiResponse(200, cachedResults, 'Search results retrieved from cache'));
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build search query
    const searchQuery = {
      $or: [
        { name: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ],
      isActive: true
    };

    // Add destination filter if provided
    if (destination) {
      const destinationDoc = await Destination.findOne({
        name: new RegExp(`^${destination}$`, 'i'),
        isActive: true
      }).select('_id');
      
      if (destinationDoc) {
        searchQuery.destination = destinationDoc._id;
      }
    }

    // Add category filter if provided
    if (category) {
      searchQuery.category = new RegExp(category, 'i');
    }

    // Execute search
    const [attractions, totalCount] = await Promise.all([
      Attraction.find(searchQuery)
        .populate('destination', 'name state region')
        .sort({ isPopular: -1, featured: -1, 'ratings.overall': -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Attraction.countDocuments(searchQuery)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    const result = {
      attractions,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      },
      searchQuery: q,
      filters: {
        destination,
        category
      }
    };

    // Cache results for 10 minutes
    await redis.set(cacheKey, result, config.cacheTtl.searchResults);

    res.json(new ApiResponse(200, result, `Found ${totalCount} attractions matching "${q}"`));

  } catch (error) {
    console.error('Search attractions error:', error);
    throw new ApiError(500, 'Failed to search attractions');
  }
});

// Get Featured Attractions
export const getFeaturedAttractions = asyncHandler(async (req, res) => {
  const { limit = 10, destination } = req.query;

  try {
    // Check cache first
    const cacheKey = `attractions:featured:${destination || 'all'}:${limit}`;
    const cachedAttractions = await redis.get(cacheKey);

    if (cachedAttractions) {
      return res.json(new ApiResponse(200, { attractions: cachedAttractions }, 'Featured attractions retrieved from cache'));
    }

    // Build search query
    const searchQuery = {
      featured: true,
      isActive: true
    };

    // Add destination filter if provided
    if (destination) {
      const destinationDoc = await Destination.findOne({
        name: new RegExp(`^${destination}$`, 'i'),
        isActive: true
      }).select('_id');
      
      if (destinationDoc) {
        searchQuery.destination = destinationDoc._id;
      }
    }

    // Get featured attractions
    const attractions = await Attraction.find(searchQuery)
      .populate('destination', 'name state region')
      .sort({ 'ratings.overall': -1, isPopular: -1 })
      .limit(parseInt(limit))
      .lean();

    // Cache for 1 hour
    await redis.set(cacheKey, attractions, config.cacheTtl.attractions);

    res.json(new ApiResponse(200, { attractions }, 'Featured attractions retrieved successfully'));

  } catch (error) {
    console.error('Get featured attractions error:', error);
    throw new ApiError(500, 'Failed to fetch featured attractions');
  }
});

// Get Attractions by Category
export const getAttractionsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { destination, limit = 20, page = 1 } = req.query;

  if (!category) {
    throw new ApiError(400, 'Category is required');
  }

  try {
    // Check cache first
    const cacheKey = `attractions:category:${category}:${destination || 'all'}:${limit}:${page}`;
    const cachedResults = await redis.get(cacheKey);

    if (cachedResults) {
      return res.json(new ApiResponse(200, cachedResults, 'Attractions retrieved from cache'));
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build search query
    const searchQuery = {
      category: new RegExp(category, 'i'),
      isActive: true
    };

    // Add destination filter if provided
    if (destination) {
      const destinationDoc = await Destination.findOne({
        name: new RegExp(`^${destination}$`, 'i'),
        isActive: true
      }).select('_id');
      
      if (destinationDoc) {
        searchQuery.destination = destinationDoc._id;
      }
    }

    // Find attractions by category
    const [attractions, totalCount] = await Promise.all([
      Attraction.find(searchQuery)
        .populate('destination', 'name state region')
        .sort({ featured: -1, isPopular: -1, 'ratings.overall': -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Attraction.countDocuments(searchQuery)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    const result = {
      attractions,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      },
      filters: {
        category,
        destination
      }
    };

    // Cache results for 30 minutes
    await redis.set(cacheKey, result, config.cacheTtl.attractions);

    res.json(new ApiResponse(200, result, `Found ${totalCount} ${category} attractions`));

  } catch (error) {
    console.error('Get attractions by category error:', error);
    throw new ApiError(500, 'Failed to fetch attractions by category');
  }
});

// Get Attraction Categories
export const getAttractionCategories = asyncHandler(async (req, res) => {
  try {
    // Check cache first
    const cacheKey = 'attractions:categories';
    const cachedCategories = await redis.get(cacheKey);

    if (cachedCategories) {
      return res.json(new ApiResponse(200, { categories: cachedCategories }, 'Categories retrieved from cache'));
    }

    // Get distinct categories with counts
    const categories = await Attraction.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          featuredCount: {
            $sum: { $cond: [{ $eq: ['$featured', true] }, 1, 0] }
          },
          avgRating: { $avg: '$ratings.overall' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1,
          featuredCount: 1,
          avgRating: { $round: ['$avgRating', 1] }
        }
      }
    ]);

    // Cache for 2 hours
    await redis.set(cacheKey, categories, 2 * 60 * 60);

    res.json(new ApiResponse(200, { categories }, 'Attraction categories retrieved successfully'));

  } catch (error) {
    console.error('Get attraction categories error:', error);
    throw new ApiError(500, 'Failed to fetch attraction categories');
  }
});

// Get Attraction Stats
export const getAttractionStats = asyncHandler(async (req, res) => {
  try {
    // Check cache first
    const cacheKey = 'attractions:stats';
    const cachedStats = await redis.get(cacheKey);

    if (cachedStats) {
      return res.json(new ApiResponse(200, { stats: cachedStats }, 'Attraction stats retrieved from cache'));
    }

    // Get comprehensive stats
    const stats = await Attraction.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $group: {
          _id: null,
          totalAttractions: { $sum: 1 },
          totalFeatured: {
            $sum: { $cond: [{ $eq: ['$featured', true] }, 1, 0] }
          },
          totalPopular: {
            $sum: { $cond: [{ $eq: ['$isPopular', true] }, 1, 0] }
          },
          totalVerified: {
            $sum: { $cond: [{ $eq: ['$verified', true] }, 1, 0] }
          },
          avgRating: { $avg: '$ratings.overall' },
          avgCost: { $avg: '$cost.amount' },
          totalCategories: { $addToSet: '$category' }
        }
      },
      {
        $project: {
          _id: 0,
          totalAttractions: 1,
          totalFeatured: 1,
          totalPopular: 1,
          totalVerified: 1,
          avgRating: { $round: ['$avgRating', 1] },
          avgCost: { $round: ['$avgCost', 0] },
          totalCategories: { $size: '$totalCategories' }
        }
      }
    ]);

    // Get category-wise distribution
    const categoryStats = await Attraction.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgRating: { $avg: '$ratings.overall' },
          avgCost: { $avg: '$cost.amount' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    // Get top attractions by rating
    const topAttractions = await Attraction.find({
      isActive: true,
      'ratings.overall': { $gte: 4.0 }
    })
      .populate('destination', 'name state')
      .sort({ 'ratings.overall': -1, 'ratings.count': -1 })
      .limit(10)
      .select('name destination category ratings.overall ratings.count featured')
      .lean();

    const result = {
      overview: stats[0] || {
        totalAttractions: 0,
        totalFeatured: 0,
        totalPopular: 0,
        totalVerified: 0,
        avgRating: 0,
        avgCost: 0,
        totalCategories: 0
      },
      categoryDistribution: categoryStats,
      topAttractions: topAttractions
    };

    // Cache for 1 hour
    await redis.set(cacheKey, result, 60 * 60);

    res.json(new ApiResponse(200, { stats: result }, 'Attraction statistics retrieved successfully'));

  } catch (error) {
    console.error('Get attraction stats error:', error);
    throw new ApiError(500, 'Failed to fetch attraction statistics');
  }
});
