import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: { type: Boolean, default: false }
  }],
  amenities: [{
    type: String,
    trim: true
  }],
  roomTypes: [{
    type: String,
    price: Number,
    capacity: Number,
    amenities: [String]
  }],
  source: {
    type: String,
    enum: ['OYO', 'MMT', 'RezLive', 'Local'],
    default: 'Local'
  },
  externalId: {
    type: String,
    sparse: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  policies: {
    checkIn: {
      type: String,
      default: '14:00'
    },
    checkOut: {
      type: String,
      default: '11:00'
    },
    cancellation: {
      type: String,
      default: 'Free cancellation up to 24 hours before check-in'
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  certificates: [{
    type: String, // FSSAI, Tourism Board, etc.
    number: String,
    validUntil: Date
  }]
}, {
  timestamps: true
});

// Index for geospatial queries
hotelSchema.index({ location: '2dsphere' });

// Index for search
hotelSchema.index({ city: 1, state: 1, isActive: 1 });
hotelSchema.index({ name: 'text', description: 'text', city: 'text' });

// Virtual for full location
hotelSchema.virtual('fullLocation').get(function() {
  return `${this.city}, ${this.state}`;
});

// Method to calculate average rating
hotelSchema.methods.updateRating = async function() {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { hotel: this._id } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    this.rating = Math.round(stats[0].avgRating * 10) / 10;
    this.reviewCount = stats[0].totalReviews;
  } else {
    this.rating = 0;
    this.reviewCount = 0;
  }

  return this.save();
};

export default mongoose.model("Hotel", hotelSchema);
