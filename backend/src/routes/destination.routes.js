import express from 'express';
import {
  getAllDestinations,
  getDestinationByName,
  getDestinationsByRegion,
  searchDestinations,
  getPopularDestinations,
  getDestinationAttractions,
  getDestinationStats
} from '../controllers/destination.controller.js';
import { optionalAuth } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { query } from 'express-validator';

const router = express.Router();

// Validation schemas
const searchValidation = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  query('region')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Region must be between 1 and 50 characters'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

// Public routes
router.get('/', searchValidation, validateRequest, optionalAuth, getAllDestinations);
router.get('/search', searchValidation, validateRequest, optionalAuth, searchDestinations);
router.get('/popular', searchValidation, validateRequest, optionalAuth, getPopularDestinations);
router.get('/stats', optionalAuth, getDestinationStats);
router.get('/:name', optionalAuth, getDestinationByName);
router.get('/:name/attractions', optionalAuth, getDestinationAttractions);

export default router;
