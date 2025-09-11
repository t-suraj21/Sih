import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingDetails,
  cancelBooking,
  updateBooking,
  getHotelBookings,
  getBookingStats
} from '../controllers/booking.controller.js';
import { verifyJWT, requireRole } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { body, query } from 'express-validator';

const router = express.Router();

// All booking routes require authentication
router.use(verifyJWT);

// Validation schemas
const createBookingValidation = [
  body('hotelId')
    .isMongoId()
    .withMessage('Valid hotel ID is required'),
  body('checkIn')
    .isISO8601()
    .withMessage('Valid check-in date is required'),
  body('checkOut')
    .isISO8601()
    .withMessage('Valid check-out date is required'),
  body('guests')
    .custom((value) => {
      if (typeof value === 'number') {
        return value >= 1;
      }
      if (typeof value === 'object' && value.adults) {
        return value.adults >= 1;
      }
      return false;
    })
    .withMessage('At least 1 adult guest is required'),
  body('rooms')
    .isInt({ min: 1 })
    .withMessage('At least 1 room is required'),
  body('guestDetails.primaryGuest.name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Primary guest name is required'),
  body('guestDetails.primaryGuest.email')
    .isEmail()
    .withMessage('Valid primary guest email is required'),
  body('guestDetails.primaryGuest.phone')
    .isMobilePhone('any')
    .withMessage('Valid primary guest phone is required')
];

const getUserBookingsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled', 'completed', 'no-show'])
    .withMessage('Invalid booking status'),
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'checkIn', 'checkOut', 'totalAmount'])
    .withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

const cancelBookingValidation = [
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Cancellation reason must not exceed 500 characters')
];

// User booking routes
router.post('/', createBookingValidation, validateRequest, createBooking);
router.get('/', getUserBookingsValidation, validateRequest, getUserBookings);
router.get('/stats', getBookingStats);
router.get('/:id', getBookingDetails);
router.put('/:id/cancel', cancelBookingValidation, validateRequest, cancelBooking);

// Admin routes
router.put('/:id', requireRole('admin'), updateBooking);

// Hotel owner/Admin routes
router.get('/hotel/:hotelId', 
  requireRole('vendor', 'admin'), 
  getUserBookingsValidation, 
  validateRequest, 
  getHotelBookings
);

export default router;