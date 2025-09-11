import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/config.js';
import { redis } from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Verify JWT Token
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Check if token is blacklisted
    const isBlacklisted = await redis.exists(`blacklist:${token}`);
    if (isBlacklisted) {
      throw new ApiError(401, "Token has been invalidated");
    }

    const decodedToken = jwt.verify(token, config.jwt.secret);

    const user = await User.findById(decodedToken?.userId).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    if (!user.isActive) {
      throw new ApiError(401, "Account is deactivated");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "Invalid access token");
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Access token expired");
    }
    throw error;
  }
});

// Optional JWT verification (for routes that work with or without auth)
export const optionalJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      // Check if token is blacklisted
      const isBlacklisted = await redis.exists(`blacklist:${token}`);
      if (!isBlacklisted) {
        const decodedToken = jwt.verify(token, config.jwt.secret);
        const user = await User.findById(decodedToken?.userId).select("-password");
        
        if (user && user.isActive) {
          req.user = user;
        }
      }
    }

    next();
  } catch (error) {
    // For optional auth, we don't throw errors, just continue without user
    next();
  }
});

// Role-based access control
export const requireRole = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, `Access denied. Required roles: ${roles.join(', ')}`);
    }

    next();
  });
};

// Check if user owns the resource or is admin
export const requireOwnershipOrAdmin = (resourceUserField = 'user') => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    // Admins can access everything
    if (req.user.role === 'admin') {
      return next();
    }

    // For other users, check ownership
    const resourceId = req.params.id;
    if (!resourceId) {
      throw new ApiError(400, "Resource ID is required");
    }

    // The actual ownership check should be done in the controller
    // This middleware just ensures the user is authenticated
    next();
  });
};

// Rate limiting for sensitive operations
export const sensitiveOperationLimit = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;
  const operation = req.route.path;
  const key = `rate_limit:${userId}:${operation}`;

  const attempts = await redis.get(key) || 0;
  const maxAttempts = 5; // 5 attempts per hour
  const windowMs = 60 * 60 * 1000; // 1 hour

  if (attempts >= maxAttempts) {
    throw new ApiError(429, "Too many attempts. Please try again later");
  }

  // Increment attempts
  await redis.set(key, parseInt(attempts) + 1, windowMs / 1000);

  next();
});
