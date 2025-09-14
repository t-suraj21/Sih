import express from 'express';
import {
  searchHotels,
  getHotelDetails,
  getHotelsByLocation,
  getPopularHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  getHotelStats
} from '../controllers/hotel.controller.js';
import { authMiddleware, requireVendor, optionalAuth } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { body, query } from 'express-validator';

const router = express.Router();

// Validation schemas
const addHotelValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Hotel name must be between 2 and 100 characters'),
  body('city')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  body('state')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be between 2 and 50 characters'),
  body('address')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Address must be between 10 and 200 characters'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('amenities')
    .optional()
    .isArray()
    .withMessage('Amenities must be an array'),
  body('location.coordinates')
    .optional()
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordinates must be an array of [longitude, latitude]')
];

const searchHotelsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  query('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  query('sortBy')
    .optional()
    .isIn(['price', 'rating', 'name', 'createdAt'])
    .withMessage('Sort by must be one of: price, rating, name, createdAt'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

const locationSearchValidation = [
  query('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  query('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  query('radius')
    .optional()
    .isFloat({ min: 0.1, max: 100 })
    .withMessage('Radius must be between 0.1 and 100 km')
];

// Public routes
router.get('/search', searchHotelsValidation, validateRequest, optionalAuth, searchHotels);
router.get('/popular', optionalAuth, getPopularHotels);
router.get('/nearby', locationSearchValidation, validateRequest, optionalAuth, getHotelsByLocation);
router.get('/:id', optionalAuth, getHotelDetails);

// Protected routes - require authentication
router.use(authMiddleware);

// Vendor and Admin routes
router.post('/', 
  requireVendor, 
  addHotelValidation, 
  validateRequest, 
  addHotel
);

router.put('/:id', 
  requireVendor, 
  addHotelValidation, 
  validateRequest, 
  updateHotel
);

router.delete('/:id', 
  requireVendor, 
  deleteHotel
);

router.get('/:id/stats', 
  requireVendor, 
  getHotelStats
);

export default router;