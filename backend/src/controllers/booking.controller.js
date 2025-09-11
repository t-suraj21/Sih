import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import Payment from '../models/Payment.js';
import { redis } from '../config/database.js';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendBookingConfirmationEmail } from '../services/email.service.js';
import { sendBookingConfirmation } from '../services/sms.service.js';

// Create Booking
export const createBooking = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    hotelId,
    checkIn,
    checkOut,
    guests,
    rooms,
    roomType,
    guestDetails,
    specialRequests
  } = req.body;

  // Validate dates
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const now = new Date();

  if (checkInDate <= now) {
    throw new ApiError(400, 'Check-in date must be in the future');
  }

  if (checkOutDate <= checkInDate) {
    throw new ApiError(400, 'Check-out date must be after check-in date');
  }

  // Check advance booking limit
  const maxAdvanceDate = new Date();
  maxAdvanceDate.setDate(maxAdvanceDate.getDate() + config.booking.maxAdvanceBookingDays);
  
  if (checkInDate > maxAdvanceDate) {
    throw new ApiError(400, `Booking can only be made up to ${config.booking.maxAdvanceBookingDays} days in advance`);
  }

  // Check minimum advance booking
  const minAdvanceDate = new Date();
  minAdvanceDate.setHours(minAdvanceDate.getHours() + config.booking.minAdvanceBookingHours);
  
  if (checkInDate < minAdvanceDate) {
    throw new ApiError(400, `Booking must be made at least ${config.booking.minAdvanceBookingHours} hours in advance`);
  }

  // Get hotel details
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    throw new ApiError(404, 'Hotel not found');
  }

  if (!hotel.isActive) {
    throw new ApiError(400, 'Hotel is not available for booking');
  }

  // Calculate pricing
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  const basePrice = hotel.price * rooms * nights;
  const taxes = basePrice * 0.18; // 18% GST
  const fees = 50; // Platform fee
  const totalAmount = basePrice + taxes + fees;

  // Create booking
  const booking = await Booking.create({
    user: userId,
    hotel: hotelId,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: {
      adults: guests.adults || guests,
      children: guests.children || 0
    },
    rooms,
    roomType: roomType || 'Standard',
    guestDetails,
    specialRequests,
    pricing: {
      basePrice,
      taxes,
      fees,
      discount: 0,
      totalAmount
    },
    status: 'pending',
    paymentStatus: 'pending'
  });

  // Populate hotel and user details
  await booking.populate([
    { path: 'hotel', select: 'name city state address contact' },
    { path: 'user', select: 'name email phone' }
  ]);

  res.status(201).json(
    new ApiResponse(201, { booking }, 'Booking created successfully')
  );
});

// Get User Bookings
export const getUserBookings = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  // Build query
  const query = { user: userId };
  if (status) {
    query.status = status;
  }

  // Build sort
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [bookings, totalCount] = await Promise.all([
    Booking.find(query)
      .populate('hotel', 'name city state images rating')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Booking.countDocuments(query)
  ]);

  const totalPages = Math.ceil(totalCount / parseInt(limit));

  res.json(new ApiResponse(200, {
    bookings,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalCount,
      hasNextPage: parseInt(page) < totalPages,
      hasPrevPage: parseInt(page) > 1,
      limit: parseInt(limit)
    }
  }, 'Bookings retrieved successfully'));
});

// Get Booking Details
export const getBookingDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;

  const booking = await Booking.findById(id)
    .populate('hotel', 'name city state address contact images amenities')
    .populate('user', 'name email phone')
    .populate('paymentId');

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  // Check access permissions
  if (userRole !== 'admin' && booking.user._id.toString() !== userId.toString()) {
    throw new ApiError(403, 'You can only access your own bookings');
  }

  res.json(new ApiResponse(200, { booking }, 'Booking details retrieved successfully'));
});

// Cancel Booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { reason } = req.body;

  const booking = await Booking.findById(id).populate('hotel', 'name');

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  // Check ownership
  if (booking.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'You can only cancel your own bookings');
  }

  // Check if booking can be cancelled
  if (!booking.canBeCancelled()) {
    throw new ApiError(400, 'Booking cannot be cancelled. Cancellation is allowed only 24 hours before check-in');
  }

  if (booking.status !== 'confirmed' && booking.status !== 'pending') {
    throw new ApiError(400, 'Only confirmed or pending bookings can be cancelled');
  }

  // Calculate refund amount
  const refundAmount = booking.calculateRefund();

  // Update booking
  booking.status = 'cancelled';
  booking.cancellation = {
    cancelledAt: new Date(),
    cancelledBy: userId,
    reason: reason || 'Cancelled by user',
    refundAmount,
    refundStatus: refundAmount > 0 ? 'pending' : 'processed'
  };

  await booking.save();

  // Process refund if applicable
  if (refundAmount > 0 && booking.paymentId) {
    try {
      // TODO: Implement actual refund processing with payment gateway
      console.log(`Processing refund of ₹${refundAmount} for booking ${booking.bookingId}`);
    } catch (error) {
      console.error('Refund processing failed:', error);
      // Don't fail the cancellation if refund processing fails
    }
  }

  // Send notifications
  try {
    await Promise.all([
      sendBookingConfirmationEmail(req.user.email, {
        bookingId: booking.bookingId,
        hotelName: booking.hotel.name,
        status: 'cancelled',
        refundAmount
      }),
      sendBookingConfirmation(req.user.phone, {
        bookingId: booking.bookingId,
        hotelName: booking.hotel.name,
        status: 'cancelled',
        refundAmount
      })
    ]);
  } catch (error) {
    console.error('Notification sending failed:', error);
    // Don't fail the cancellation if notifications fail
  }

  res.json(new ApiResponse(200, { 
    booking: {
      id: booking._id,
      bookingId: booking.bookingId,
      status: booking.status,
      refundAmount
    }
  }, 'Booking cancelled successfully'));
});

// Update Booking (Admin/Hotel owner only)
export const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const userRole = req.user.role;

  const booking = await Booking.findById(id);

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  // Only admin can update bookings for now
  if (userRole !== 'admin') {
    throw new ApiError(403, 'Only administrators can update bookings');
  }

  // Prevent updating certain fields
  delete updates.user;
  delete updates.hotel;
  delete updates.pricing;

  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true }
  ).populate([
    { path: 'hotel', select: 'name city state' },
    { path: 'user', select: 'name email phone' }
  ]);

  res.json(new ApiResponse(200, { booking: updatedBooking }, 'Booking updated successfully'));
});

// Get Hotel Bookings (Hotel owner/Admin only)
export const getHotelBookings = asyncHandler(async (req, res) => {
  const { hotelId } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;
  const { page = 1, limit = 20, status, startDate, endDate } = req.query;

  // Check permissions
  if (userRole !== 'admin') {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new ApiError(404, 'Hotel not found');
    }
    if (hotel.owner.toString() !== userId.toString()) {
      throw new ApiError(403, 'You can only view bookings for your own hotels');
    }
  }

  // Build query
  const query = { hotel: hotelId };
  if (status) {
    query.status = status;
  }
  if (startDate || endDate) {
    query.checkIn = {};
    if (startDate) query.checkIn.$gte = new Date(startDate);
    if (endDate) query.checkIn.$lte = new Date(endDate);
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [bookings, totalCount] = await Promise.all([
    Booking.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Booking.countDocuments(query)
  ]);

  const totalPages = Math.ceil(totalCount / parseInt(limit));

  res.json(new ApiResponse(200, {
    bookings,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalCount,
      hasNextPage: parseInt(page) < totalPages,
      hasPrevPage: parseInt(page) > 1,
      limit: parseInt(limit)
    }
  }, 'Hotel bookings retrieved successfully'));
});

// Get Booking Statistics
export const getBookingStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userRole = req.user.role;

  let matchQuery = {};

  // If not admin, only show user's own bookings
  if (userRole !== 'admin') {
    matchQuery.user = userId;
  }

  const stats = await Booking.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
        totalRevenue: { $sum: '$pricing.totalAmount' },
        confirmedBookings: {
          $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
        },
        pendingBookings: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        cancelledBookings: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
        },
        completedBookings: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        averageBookingValue: { $avg: '$pricing.totalAmount' }
      }
    }
  ]);

  const result = stats[0] || {
    totalBookings: 0,
    totalRevenue: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    completedBookings: 0,
    averageBookingValue: 0
  };

  res.json(new ApiResponse(200, { stats: result }, 'Booking statistics retrieved successfully'));
});
