import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendBookingConfirmationEmail } from '../services/email.service.js';
import { sendBookingConfirmation } from '../services/sms.service.js';

// Initialize Razorpay
let razorpayInstance = null;

if (config.razorpay.keyId && config.razorpay.keySecret) {
  razorpayInstance = new Razorpay({
    key_id: config.razorpay.keyId,
    key_secret: config.razorpay.keySecret,
  });
}

// Create Payment Order
export const createPaymentOrder = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const userId = req.user._id;

  // Get booking details
  const booking = await Booking.findById(bookingId)
    .populate('hotel', 'name city state')
    .populate('user', 'name email phone');

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  // Check ownership
  if (booking.user._id.toString() !== userId.toString()) {
    throw new ApiError(403, 'You can only create payment for your own bookings');
  }

  // Check booking status
  if (booking.status !== 'pending') {
    throw new ApiError(400, 'Payment can only be created for pending bookings');
  }

  if (booking.paymentStatus !== 'pending') {
    throw new ApiError(400, 'Payment has already been processed for this booking');
  }

  try {
    let razorpayOrder;
    
    if (razorpayInstance) {
      // Create Razorpay order
      const options = {
        amount: Math.round(booking.pricing.totalAmount * 100), // Amount in paise
        currency: 'INR',
        receipt: `booking_${booking.bookingId}`,
        notes: {
          bookingId: booking._id.toString(),
          hotelName: booking.hotel.name,
          userEmail: booking.user.email
        }
      };

      razorpayOrder = await razorpayInstance.orders.create(options);
    } else {
      // Mock payment order for development
      razorpayOrder = {
        id: `order_mock_${Date.now()}`,
        amount: Math.round(booking.pricing.totalAmount * 100),
        currency: 'INR',
        receipt: `booking_${booking.bookingId}`,
        status: 'created'
      };
      console.log('🔄 Mock payment order created:', razorpayOrder.id);
    }

    // Create payment record
    const payment = await Payment.create({
      booking: booking._id,
      user: userId,
      amount: booking.pricing.totalAmount,
      currency: 'INR',
      paymentMethod: 'card', // Default, will be updated on confirmation
      razorpay: {
        orderId: razorpayOrder.id
      },
      status: 'created',
      metadata: {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Update booking with payment reference
    booking.paymentId = payment._id;
    await booking.save();

    res.status(201).json(new ApiResponse(201, {
      paymentOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: config.razorpay.keyId
      },
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        totalAmount: booking.pricing.totalAmount,
        hotelName: booking.hotel.name
      }
    }, 'Payment order created successfully'));

  } catch (error) {
    console.error('Payment order creation error:', error);
    throw new ApiError(500, 'Failed to create payment order');
  }
});

// Verify Payment
export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paymentMethod = 'card'
  } = req.body;

  if (!razorpay_order_id) {
    throw new ApiError(400, 'Razorpay order ID is required');
  }

  // Find payment by order ID
  const payment = await Payment.findOne({
    'razorpay.orderId': razorpay_order_id
  }).populate({
    path: 'booking',
    populate: [
      { path: 'hotel', select: 'name city state address contact' },
      { path: 'user', select: 'name email phone' }
    ]
  });

  if (!payment) {
    throw new ApiError(404, 'Payment not found');
  }

  // Check if payment is already processed
  if (payment.status === 'captured') {
    throw new ApiError(400, 'Payment has already been processed');
  }

  let isPaymentValid = false;

  if (razorpayInstance && razorpay_payment_id && razorpay_signature) {
    // Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(body.toString())
      .digest('hex');

    isPaymentValid = expectedSignature === razorpay_signature;
  } else {
    // Mock payment verification for development
    isPaymentValid = true;
    console.log('🔄 Mock payment verification successful');
  }

  if (!isPaymentValid) {
    // Update payment status to failed
    payment.status = 'failed';
    payment.failureReason = 'Invalid payment signature';
    await payment.save();

    throw new ApiError(400, 'Payment verification failed');
  }

  try {
    // Update payment record
    payment.razorpay.paymentId = razorpay_payment_id || `pay_mock_${Date.now()}`;
    payment.razorpay.signature = razorpay_signature || 'mock_signature';
    payment.paymentMethod = paymentMethod;
    payment.status = 'captured';
    payment.gatewayResponse = {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      method: paymentMethod,
      verifiedAt: new Date()
    };

    await payment.save();

    // Update booking status
    const booking = payment.booking;
    booking.status = 'confirmed';
    booking.paymentStatus = 'paid';
    await booking.save();

    // Send confirmation notifications
    try {
      const bookingDetails = {
        bookingId: booking.bookingId,
        hotelName: booking.hotel.name,
        checkIn: booking.checkIn.toISOString().split('T')[0],
        checkOut: booking.checkOut.toISOString().split('T')[0],
        guests: booking.totalGuests,
        amount: booking.pricing.totalAmount,
        guestName: booking.user.name
      };

      await Promise.all([
        sendBookingConfirmationEmail(booking.user.email, bookingDetails),
        sendBookingConfirmation(booking.user.phone, bookingDetails)
      ]);
    } catch (notificationError) {
      console.error('Notification sending failed:', notificationError);
      // Don't fail the payment if notifications fail
    }

    res.json(new ApiResponse(200, {
      payment: {
        id: payment._id,
        status: payment.status,
        amount: payment.amount,
        paymentId: payment.razorpay.paymentId
      },
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        status: booking.status,
        paymentStatus: booking.paymentStatus
      }
    }, 'Payment verified and booking confirmed successfully'));

  } catch (error) {
    console.error('Payment confirmation error:', error);
    throw new ApiError(500, 'Failed to confirm payment');
  }
});

// Get Payment Details
export const getPaymentDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;

  const payment = await Payment.findById(id)
    .populate({
      path: 'booking',
      populate: [
        { path: 'hotel', select: 'name city state' },
        { path: 'user', select: 'name email phone' }
      ]
    });

  if (!payment) {
    throw new ApiError(404, 'Payment not found');
  }

  // Check access permissions
  if (userRole !== 'admin' && payment.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'You can only access your own payment details');
  }

  res.json(new ApiResponse(200, { payment }, 'Payment details retrieved successfully'));
});

// Refund Payment
export const refundPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount, reason } = req.body;
  const userRole = req.user.role;

  // Only admin can initiate refunds
  if (userRole !== 'admin') {
    throw new ApiError(403, 'Only administrators can process refunds');
  }

  const payment = await Payment.findById(id)
    .populate('booking', 'bookingId status cancellation');

  if (!payment) {
    throw new ApiError(404, 'Payment not found');
  }

  if (!payment.canBeRefunded()) {
    throw new ApiError(400, 'Payment cannot be refunded');
  }

  const refundAmount = amount || payment.getRefundableAmount();

  if (refundAmount <= 0) {
    throw new ApiError(400, 'Invalid refund amount');
  }

  if (refundAmount > payment.getRefundableAmount()) {
    throw new ApiError(400, 'Refund amount exceeds refundable amount');
  }

  try {
    let refundResponse;

    if (razorpayInstance && payment.razorpay.paymentId && !payment.razorpay.paymentId.includes('mock')) {
      // Process actual refund with Razorpay
      refundResponse = await razorpayInstance.payments.refund(payment.razorpay.paymentId, {
        amount: Math.round(refundAmount * 100), // Amount in paise
        notes: {
          reason: reason || 'Booking cancellation',
          bookingId: payment.booking.bookingId
        }
      });
    } else {
      // Mock refund for development
      refundResponse = {
        id: `rfnd_mock_${Date.now()}`,
        amount: Math.round(refundAmount * 100),
        status: 'processed'
      };
      console.log('🔄 Mock refund processed:', refundResponse.id);
    }

    // Add refund record
    payment.refunds.push({
      refundId: refundResponse.id,
      amount: refundAmount,
      reason: reason || 'Booking cancellation',
      status: 'processed',
      processedAt: new Date()
    });

    // Update payment status if fully refunded
    if (payment.totalRefunded + refundAmount >= payment.amount) {
      payment.status = 'refunded';
    }

    await payment.save();

    // Update booking cancellation status
    if (payment.booking.cancellation) {
      await Booking.findByIdAndUpdate(payment.booking._id, {
        'cancellation.refundStatus': 'processed'
      });
    }

    res.json(new ApiResponse(200, {
      refund: {
        id: refundResponse.id,
        amount: refundAmount,
        status: 'processed'
      },
      payment: {
        id: payment._id,
        totalRefunded: payment.totalRefunded,
        refundableAmount: payment.getRefundableAmount()
      }
    }, 'Refund processed successfully'));

  } catch (error) {
    console.error('Refund processing error:', error);
    throw new ApiError(500, 'Failed to process refund');
  }
});

// Get Payment Statistics
export const getPaymentStats = asyncHandler(async (req, res) => {
  const userRole = req.user.role;

  if (userRole !== 'admin') {
    throw new ApiError(403, 'Only administrators can view payment statistics');
  }

  const stats = await Payment.aggregate([
    {
      $group: {
        _id: null,
        totalPayments: { $sum: 1 },
        totalAmount: { $sum: '$amount' },
        successfulPayments: {
          $sum: { $cond: [{ $in: ['$status', ['captured', 'refunded']] }, 1, 0] }
        },
        failedPayments: {
          $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] }
        },
        totalRefunded: {
          $sum: {
            $reduce: {
              input: '$refunds',
              initialValue: 0,
              in: {
                $add: [
                  '$$value',
                  { $cond: [{ $eq: ['$$this.status', 'processed'] }, '$$this.amount', 0] }
                ]
              }
            }
          }
        },
        averagePaymentAmount: { $avg: '$amount' }
      }
    }
  ]);

  const result = stats[0] || {
    totalPayments: 0,
    totalAmount: 0,
    successfulPayments: 0,
    failedPayments: 0,
    totalRefunded: 0,
    averagePaymentAmount: 0
  };

  // Calculate success rate
  result.successRate = result.totalPayments > 0 
    ? ((result.successfulPayments / result.totalPayments) * 100).toFixed(2)
    : 0;

  res.json(new ApiResponse(200, { stats: result }, 'Payment statistics retrieved successfully'));
});
