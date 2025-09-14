import Destination from '../models/Destination.js';
import Attraction from '../models/Attraction.js';
import Hotel from '../models/Hotel.js';
import { redis } from '../config/database.js';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get All Destinations
export const getAllDestinations = asyncHandler(async (req, res) => {
  const { region, limit = 50, page = 1, sortBy = 'name', sortOrder = 'asc' } = req.query;

  try {
    // Build search query
    const searchQuery = { isActive: true };

    if (region) {
      searchQuery.region = new RegExp(region, 'i');
    }

    // Build sort object
    const sortOptions = {};
    if (sortBy === 'popularity') {
      sortOptions.isPopular = -1;
      sortOptions['statistics.visitorCount'] = -1;
    } else if (sortBy === 'rating') {
      sortOptions['statistics.averageRating'] = -1;
    } else {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Check cache first
    const cacheKey = `destinations:all:${JSON.stringify({ region, limit, page, sortBy, sortOrder })}`;
    const cachedResults = await redis.get(cacheKey);

    if (cachedResults) {
      return res.json(new ApiResponse(200, cachedResults, 'Destinations retrieved from cache'));
    }

    // Execute search
    const [destinations, totalCount] = await Promise.all([
      Destination.find(searchQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Destination.countDocuments(searchQuery)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    const result = {
      destinations,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      },
      filters: {
        region
      }
    };

    // Cache results for 30 minutes
    await redis.set(cacheKey, result, config.cacheTtl.destinations);

    res.json(new ApiResponse(200, result, `Found ${totalCount} destinations`));

  } catch (error) {
    console.error('Get destinations error:', error);
    throw new ApiError(500, 'Failed to fetch destinations');
  }
});

// Get Destination by Name
export const getDestinationByName = asyncHandler(async (req, res) => {
  const { name } = req.params;

  if (!name) {
    throw new ApiError(400, 'Destination name is required');
  }

  try {
    // Check cache first
    const cacheKey = `destination:${name}`;
    const cachedDestination = await redis.get(cacheKey);

    if (cachedDestination) {
      return res.json(new ApiResponse(200, { destination: cachedDestination }, 'Destination retrieved from cache'));
    }

    // Find destination by name (case insensitive)
    const destination = await Destination.findOne({
      name: new RegExp(`^${name}$`, 'i'),
      isActive: true
    }).lean();

    if (!destination) {
      throw new ApiError(404, 'Destination not found');
    }

    // Cache destination for 1 hour
    await redis.set(cacheKey, destination, config.cacheTtl.destinations);

    res.json(new ApiResponse(200, { destination }, 'Destination retrieved successfully'));

  } catch (error) {
    console.error('Get destination error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch destination');
  }
});

// Get Destinations by Region
export const getDestinationsByRegion = asyncHandler(async (req, res) => {
  const { region } = req.params;
  const { limit = 20, page = 1 } = req.query;

  if (!region) {
    throw new ApiError(400, 'Region is required');
  }

  try {
    // Check cache first
    const cacheKey = `destinations:region:${region}:${limit}:${page}`;
    const cachedResults = await redis.get(cacheKey);

    if (cachedResults) {
      return res.json(new ApiResponse(200, cachedResults, 'Destinations retrieved from cache'));
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Find destinations by region
    const [destinations, totalCount] = await Promise.all([
      Destination.find({
        region: new RegExp(region, 'i'),
        isActive: true
      })
        .sort({ isPopular: -1, 'statistics.visitorCount': -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Destination.countDocuments({
        region: new RegExp(region, 'i'),
        isActive: true
      })
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    const result = {
      destinations,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      },
      filters: {
        region
      }
    };

    // Cache results for 30 minutes
    await redis.set(cacheKey, result, config.cacheTtl.destinations);

    res.json(new ApiResponse(200, result, `Found ${totalCount} destinations in ${region}`));

  } catch (error) {
    console.error('Get destinations by region error:', error);
    throw new ApiError(500, 'Failed to fetch destinations by region');
  }
});

// Search Destinations
export const searchDestinations = asyncHandler(async (req, res) => {
  const { q, limit = 20, page = 1 } = req.query;

  if (!q || q.trim().length === 0) {
    throw new ApiError(400, 'Search query is required');
  }

  try {
    // Check cache first
    const cacheKey = `destinations:search:${q}:${limit}:${page}`;
    const cachedResults = await redis.get(cacheKey);

    if (cachedResults) {
      return res.json(new ApiResponse(200, cachedResults, 'Search results retrieved from cache'));
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build search query for text search
    const searchQuery = {
      $text: { $search: q },
      isActive: true
    };

    // Execute search with text index
    const [destinations, totalCount] = await Promise.all([
      Destination.find(searchQuery, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' }, isPopular: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Destination.countDocuments(searchQuery)
    ]);

    // If no text search results, try regular search
    if (destinations.length === 0) {
      const fallbackQuery = {
        $or: [
          { name: new RegExp(q, 'i') },
          { state: new RegExp(q, 'i') },
          { description: new RegExp(q, 'i') },
          { highlights: { $in: [new RegExp(q, 'i')] } },
          { tags: { $in: [new RegExp(q, 'i')] } }
        ],
        isActive: true
      };

      const [fallbackDestinations, fallbackTotalCount] = await Promise.all([
        Destination.find(fallbackQuery)
          .sort({ isPopular: -1, 'statistics.visitorCount': -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .lean(),
        Destination.countDocuments(fallbackQuery)
      ]);

      destinations.push(...fallbackDestinations);
      totalCount = fallbackTotalCount;
    }

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    const result = {
      destinations,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      },
      searchQuery: q
    };

    // Cache results for 10 minutes
    await redis.set(cacheKey, result, config.cacheTtl.searchResults);

    res.json(new ApiResponse(200, result, `Found ${totalCount} destinations matching "${q}"`));

  } catch (error) {
    console.error('Search destinations error:', error);
    throw new ApiError(500, 'Failed to search destinations');
  }
});

// Get Popular Destinations
export const getPopularDestinations = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  try {
    // Check cache first
    const cacheKey = `destinations:popular:${limit}`;
    const cachedDestinations = await redis.get(cacheKey);

    if (cachedDestinations) {
      return res.json(new ApiResponse(200, { destinations: cachedDestinations }, 'Popular destinations retrieved from cache'));
    }

    // Get popular destinations
    const destinations = await Destination.find({
      isPopular: true,
      isActive: true
    })
      .sort({ 'statistics.visitorCount': -1, 'statistics.averageRating': -1 })
      .limit(parseInt(limit))
      .lean();

    // Cache for 1 hour
    await redis.set(cacheKey, destinations, 60 * 60);

    res.json(new ApiResponse(200, { destinations }, 'Popular destinations retrieved successfully'));

  } catch (error) {
    console.error('Get popular destinations error:', error);
    throw new ApiError(500, 'Failed to fetch popular destinations');
  }
});

// Get Destination Attractions
export const getDestinationAttractions = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const { limit = 20, page = 1, category } = req.query;

  if (!name) {
    throw new ApiError(400, 'Destination name is required');
  }

  try {
    // Find destination first
    const destination = await Destination.findOne({
      name: new RegExp(`^${name}$`, 'i'),
      isActive: true
    }).lean();

    if (!destination) {
      throw new ApiError(404, 'Destination not found');
    }

    // Check cache first
    const cacheKey = `destination:${name}:attractions:${category || 'all'}:${limit}:${page}`;
    const cachedResults = await redis.get(cacheKey);

    if (cachedResults) {
      return res.json(new ApiResponse(200, cachedResults, 'Attractions retrieved from cache'));
    }

    // Build search query
    const searchQuery = {
      destination: destination._id,
      isActive: true
    };

    if (category) {
      searchQuery.category = new RegExp(category, 'i');
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get attractions
    const [attractions, totalCount] = await Promise.all([
      Attraction.find(searchQuery)
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
      destination: {
        name: destination.name,
        state: destination.state,
        region: destination.region
      },
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
        category
      }
    };

    // Cache results for 30 minutes
    await redis.set(cacheKey, result, config.cacheTtl.destinations);

    res.json(new ApiResponse(200, result, `Found ${totalCount} attractions in ${destination.name}`));

  } catch (error) {
    console.error('Get destination attractions error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch destination attractions');
  }
});

// Get Destination Stats
export const getDestinationStats = asyncHandler(async (req, res) => {
  try {
    // Check cache first
    const cacheKey = 'destinations:stats';
    const cachedStats = await redis.get(cacheKey);

    if (cachedStats) {
      return res.json(new ApiResponse(200, { stats: cachedStats }, 'Destination stats retrieved from cache'));
    }

    // Get comprehensive stats
    const stats = await Destination.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $group: {
          _id: null,
          totalDestinations: { $sum: 1 },
          totalStates: { $addToSet: '$state' },
          totalRegions: { $addToSet: '$region' },
          totalPopularDestinations: {
            $sum: { $cond: [{ $eq: ['$isPopular', true] }, 1, 0] }
          },
          totalVerifiedDestinations: {
            $sum: { $cond: [{ $eq: ['$verified', true] }, 1, 0] }
          },
          avgRating: { $avg: '$statistics.averageRating' },
          totalVisitors: { $sum: '$statistics.visitorCount' },
          totalHotels: { $sum: '$statistics.hotelsCount' },
          totalAttractions: { $sum: '$statistics.attractionsCount' }
        }
      },
      {
        $project: {
          _id: 0,
          totalDestinations: 1,
          totalStates: { $size: '$totalStates' },
          totalRegions: { $size: '$totalRegions' },
          totalPopularDestinations: 1,
          totalVerifiedDestinations: 1,
          avgRating: { $round: ['$avgRating', 1] },
          totalVisitors: 1,
          totalHotels: 1,
          totalAttractions: 1
        }
      }
    ]);

    // Get region-wise distribution
    const regionStats = await Destination.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $group: {
          _id: '$region',
          count: { $sum: 1 },
          avgRating: { $avg: '$statistics.averageRating' },
          totalVisitors: { $sum: '$statistics.visitorCount' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get top destinations by visitors
    const topDestinations = await Destination.find({
      isActive: true,
      'statistics.visitorCount': { $gt: 0 }
    })
      .sort({ 'statistics.visitorCount': -1 })
      .limit(10)
      .select('name state region statistics.visitorCount statistics.averageRating')
      .lean();

    const result = {
      overview: stats[0] || {
        totalDestinations: 0,
        totalStates: 0,
        totalRegions: 0,
        totalPopularDestinations: 0,
        totalVerifiedDestinations: 0,
        avgRating: 0,
        totalVisitors: 0,
        totalHotels: 0,
        totalAttractions: 0
      },
      regionDistribution: regionStats,
      topDestinations: topDestinations
    };

    // Cache for 1 hour
    await redis.set(cacheKey, result, 60 * 60);

    res.json(new ApiResponse(200, { stats: result }, 'Destination statistics retrieved successfully'));

  } catch (error) {
    console.error('Get destination stats error:', error);
    throw new ApiError(500, 'Failed to fetch destination statistics');
  }
});
