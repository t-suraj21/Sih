import express from 'express';
import {
  getPackages,
  getPackageById,
  createPackageBooking,
  getUserPackageBookings,
  getBookingById,
  calculatePackagePrice
} from '../controllers/package.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes - order matters! Specific routes before parameterized routes
router.get('/', getPackages);
router.post('/calculate-price', calculatePackagePrice);
router.get('/:id', getPackageById);

// Protected routes
router.use(authenticate);
router.post('/book', createPackageBooking);
router.get('/bookings/my', getUserPackageBookings);
router.get('/bookings/:id', getBookingById);

export default router;

