import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config/config.js';
import { logger } from '../utils/logger.js';

// Authenticate JWT token
export const authenticate = async (req, res, next) => {
  try {
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
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Get user from database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is verified (optional, based on your requirements)
    if (!user.verified && req.path !== '/verify-phone' && req.path !== '/send-otp') {
      return res.status(403).json({
        success: false,
        message: 'Please verify your phone number to continue'
      });
    }

    // Attach user to request object
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Authorize user roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Insufficient permissions'
        });
      }

      next();
    } catch (error) {
      logger.error('Authorization error:', error);
      res.status(500).json({
        success: false,
        message: 'Authorization failed'
      });
    }
  };
};

// Optional authentication (doesn't fail if no token)
export const optionalAuth = async (req, res, next) => {
  try {
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
        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret);

        // Get user from database
        const user = await User.findById(decoded.id);
        if (user) {
          req.user = user;
          req.token = token;
        }
      } catch (error) {
        // Token is invalid, but we continue without authentication
        logger.debug('Invalid token in optional auth:', error.message);
      }
    }

    next();
  } catch (error) {
    logger.error('Optional authentication error:', error);
    // Continue without authentication
    next();
  }
};

// Check if user is admin
export const requireAdmin = authorize('admin');

// Check if user is vendor or admin
export const requireVendorOrAdmin = authorize('vendor', 'admin');

// Check if user is tourist, vendor, or admin
export const requireAnyRole = authorize('tourist', 'vendor', 'admin');

// Rate limiting by user
export const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const userRequests = new Map();

  return (req, res, next) => {
    if (!req.user) {
      return next(); // Skip rate limiting for unauthenticated users
    }

    const userId = req.user.id;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    if (userRequests.has(userId)) {
      const userRequestTimes = userRequests.get(userId);
      const validRequests = userRequestTimes.filter(time => time > windowStart);
      userRequests.set(userId, validRequests);
    }

    // Check rate limit
    const currentRequests = userRequests.get(userId) || [];
    
    if (currentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    // Add current request
    currentRequests.push(now);
    userRequests.set(userId, currentRequests);

    next();
  };
};

export default {
  authenticate,
  authorize,
  optionalAuth,
  requireAdmin,
  requireVendorOrAdmin,
  requireAnyRole,
  userRateLimit
};
