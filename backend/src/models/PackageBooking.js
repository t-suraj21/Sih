import mongoose from 'mongoose';

const packageBookingSchema = new mongoose.Schema({
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
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  packageType: {
    type: String,
    required: true,
    enum: ['single', 'couple', 'family', 'group', 'corporate', 'custom']
  },
  travelDates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  persons: {
    adults: { type: Number, required: true, min: 1 },
    children: { type: Number, default: 0, min: 0 },
    infants: { type: Number, default: 0, min: 0 }
  },
  selectedOptions: {
    hotel: {
      optionIndex: Number,
      hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
      name: String,
      roomType: String,
      price: Number
    },
    food: {
      optionIndex: Number,
      restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
      name: String,
      mealType: String,
      price: Number
    },
    travel: {
      optionIndex: Number,
      transportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
      name: String,
      vehicleType: String,
      price: Number
    },
    guide: {
      optionIndex: Number,
      guideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
      name: String,
      languages: [String],
      price: Number
    }
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
  pricing: {
    basePrice: { type: Number, required: true },
    hotelPrice: { type: Number, default: 0 },
    foodPrice: { type: Number, default: 0 },
    travelPrice: { type: Number, default: 0 },
    guidePrice: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, default: 0 },
    serviceCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }
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
  specialRequests: {
    type: String,
    maxlength: 500
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
  notes: {
    internal: String,
    customer: String
  }
}, {
  timestamps: true
});

// Generate unique booking ID
packageBookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    const prefix = 'PKG';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.bookingId = `${prefix}${timestamp}${random}`;
  }
  next();
});

// Indexes
packageBookingSchema.index({ user: 1, createdAt: -1 });
packageBookingSchema.index({ package: 1 });
packageBookingSchema.index({ bookingId: 1 });
packageBookingSchema.index({ status: 1, paymentStatus: 1 });

export default mongoose.model('PackageBooking', packageBookingSchema);

