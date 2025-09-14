import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/config.js';
import { redis } from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Main authentication middleware
export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // Get token from cookie (alternative)
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, 'Access token required');
  }

  try {
    // Check if token is blacklisted (if Redis is available)
    try {
      const isBlacklisted = await redis.get(`blacklist:${token}`);
      if (isBlacklisted) {
        throw new ApiError(401, 'Token has been invalidated');
      }
    } catch (redisError) {
      console.debug('Redis not available for blacklist check:', redisError.message);
      // Continue without blacklist check if Redis is unavailable
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    if (!user.isActive) {
      throw new ApiError(401, 'Account is deactivated');
    }

    // Attach user to request object
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid token');
    }
    
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Token expired');
    }

    throw error;
  }
});

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // Get token from cookie
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      // Check if token is blacklisted (if Redis is available)
      let isBlacklisted = false;
      try {
        isBlacklisted = await redis.get(`blacklist:${token}`);
      } catch (redisError) {
        console.debug('Redis not available for blacklist check:', redisError.message);
      }
      
      if (!isBlacklisted) {
        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret);

        // Get user from database
        const user = await User.findById(decoded.userId);
        if (user && user.isActive) {
          req.user = user;
          req.token = token;
        }
      }
    } catch (error) {
      // Token is invalid, but we continue without authentication
      console.debug('Invalid token in optional auth:', error.message);
    }
  }

  next();
});

// Role-based authorization middleware
export const authorize = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'Insufficient permissions');
    }

    next();
  });
};

// Specific role middlewares
export const requireAdmin = authorize('admin');
export const requireVendor = authorize('vendor', 'admin');
export const requireTourist = authorize('tourist', 'vendor', 'admin');

// Check if user owns the resource
export const requireOwnership = (resourceIdField = 'id') => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    // Admin can access all resources
    if (req.user.role === 'admin') {
      return next();
    }

    const resourceId = req.params[resourceIdField];
    const userId = req.user._id.toString();

    // For user-specific resources, check ownership
    if (resourceId && resourceId !== userId) {
      // Get the resource and check if user owns it
      // This would need to be customized based on the resource type
      throw new ApiError(403, 'Access denied: You can only access your own resources');
    }

    next();
  });
};

// Vendor-specific middleware (vendors can only access their own resources)
export const requireVendorOwnership = (Model, ownerField = 'vendor') => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    // Admin can access all resources
    if (req.user.role === 'admin') {
      return next();
    }

    // Only vendors and admins can proceed
    if (!['vendor', 'admin'].includes(req.user.role)) {
      throw new ApiError(403, 'Vendor access required');
    }

    // For vendors, check if they own the resource
    if (req.user.role === 'vendor') {
      const resourceId = req.params.id;
      if (resourceId) {
        const resource = await Model.findById(resourceId);
        if (!resource) {
          throw new ApiError(404, 'Resource not found');
        }

        if (resource[ownerField].toString() !== req.user._id.toString()) {
          throw new ApiError(403, 'Access denied: You can only access your own resources');
        }
      }
    }

    next();
  });
};

// Rate limiting middleware
export const rateLimitByUser = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return next(); // Skip rate limiting for unauthenticated users
    }

    const userId = req.user._id.toString();
    const key = `rate_limit:${userId}`;
    
    try {
      const current = await redis.get(key);
      const requests = current ? parseInt(current) : 0;

      if (requests >= maxRequests) {
        throw new ApiError(429, 'Too many requests. Please try again later.');
      }

      // Increment counter
      await redis.incr(key);
      if (requests === 0) {
        await redis.expire(key, Math.ceil(windowMs / 1000));
      }

      next();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      // If Redis fails, continue without rate limiting
      console.debug('Rate limiting not available (Redis error):', error.message);
      next();
    }
  });
};

// Check email verification
export const requireEmailVerification = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Authentication required');
  }

  if (!req.user.emailVerified) {
    throw new ApiError(403, 'Email verification required');
  }

  next();
});

// Check phone verification
export const requirePhoneVerification = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Authentication required');
  }

  if (!req.user.phoneVerified) {
    throw new ApiError(403, 'Phone verification required');
  }

  next();
});

// Check KYC verification
export const requireKYCVerification = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Authentication required');
  }

  if (!req.user.kycVerified) {
    throw new ApiError(403, 'KYC verification required');
  }

  next();
});

export default {
  authMiddleware,
  optionalAuth,
  authorize,
  requireAdmin,
  requireVendor,
  requireTourist,
  requireOwnership,
  requireVendorOwnership,
  rateLimitByUser,
  requireEmailVerification,
  requirePhoneVerification,
  requireKYCVerification
};