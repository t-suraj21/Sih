import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  rooms: {
    type: Number,
    required: true,
    min: 1
  },
  roomType: {
    type: String,
    default: 'Standard'
  },
  guestDetails: {
    primaryGuest: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      idType: { type: String, enum: ['Aadhaar', 'Passport', 'Driving License', 'Voter ID'] },
      idNumber: String
    },
    additionalGuests: [{
      name: String,
      age: Number,
      relation: String
    }]
  },
  specialRequests: {
    type: String,
    maxlength: 500
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    taxes: {
      type: Number,
      default: 0
    },
    fees: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'partial'],
    default: 'pending'
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  cancellation: {
    cancelledAt: Date,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'failed']
    }
  },
  checkInDetails: {
    actualCheckIn: Date,
    actualCheckOut: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  notes: {
    internal: String, // For admin/hotel use
    customer: String  // Customer visible notes
  }
}, {
  timestamps: true
});

// Generate unique booking ID
bookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    const prefix = 'YTR';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.bookingId = `${prefix}${timestamp}${random}`;
  }
  next();
});

// Index for efficient queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ hotel: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ status: 1, paymentStatus: 1 });

// Virtual for booking duration
bookingSchema.virtual('duration').get(function() {
  const diffTime = Math.abs(this.checkOut - this.checkIn);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days
});

// Virtual for total guests
bookingSchema.virtual('totalGuests').get(function() {
  return this.guests.adults + this.guests.children;
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const checkInDate = new Date(this.checkIn);
  const hoursDiff = (checkInDate - now) / (1000 * 60 * 60);
  
  return this.status === 'confirmed' && hoursDiff > 24; // 24 hours before check-in
};

// Method to calculate refund amount
bookingSchema.methods.calculateRefund = function() {
  const now = new Date();
  const checkInDate = new Date(this.checkIn);
  const hoursDiff = (checkInDate - now) / (1000 * 60 * 60);
  
  if (hoursDiff > 48) {
    return this.pricing.totalAmount; // Full refund
  } else if (hoursDiff > 24) {
    return this.pricing.totalAmount * 0.5; // 50% refund
  } else {
    return 0; // No refund
  }
};

export default mongoose.model("Booking", bookingSchema);
