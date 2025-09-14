import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Hotel/Resort', 
      'Tour Guide', 
      'Transport Service', 
      'Restaurant/Food',
      'Adventure Sports', 
      'Cultural Experience', 
      'Travel Agency', 
      'Eco Tourism'
    ]
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: 'India' },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    address: String
  },
  pricing: {
    basePrice: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    unit: { 
      type: String, 
      enum: ['per person', 'per night', 'per day', 'per group', 'fixed'],
      default: 'per person'
    },
    discounts: [{
      type: { type: String, enum: ['early_bird', 'group', 'seasonal'] },
      percentage: Number,
      minQuantity: Number,
      validFrom: Date,
      validTo: Date
    }]
  },
  availability: {
    isActive: { type: Boolean, default: true },
    schedule: {
      monday: { available: Boolean, slots: [String] },
      tuesday: { available: Boolean, slots: [String] },
      wednesday: { available: Boolean, slots: [String] },
      thursday: { available: Boolean, slots: [String] },
      friday: { available: Boolean, slots: [String] },
      saturday: { available: Boolean, slots: [String] },
      sunday: { available: Boolean, slots: [String] }
    },
    blackoutDates: [Date],
    maxCapacity: Number,
    minBookingAdvance: { type: Number, default: 1 }, // days
    maxBookingAdvance: { type: Number, default: 365 } // days
  },
  media: {
    images: [{
      url: String,
      caption: String,
      isPrimary: Boolean
    }],
    videos: [{
      url: String,
      caption: String
    }]
  },
  features: {
    amenities: [String],
    included: [String],
    excluded: [String],
    requirements: [String],
    restrictions: [String]
  },
  policies: {
    cancellation: {
      type: String,
      enum: ['flexible', 'moderate', 'strict'],
      default: 'moderate'
    },
    refundPolicy: String,
    termsAndConditions: String
  },
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 },
    distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 }
    }
  },
  stats: {
    views: { type: Number, default: 0 },
    bookings: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    lastBooked: Date
  },
  verification: {
    isVerified: { type: Boolean, default: false },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    documents: [{
      type: String,
      url: String,
      uploadedAt: Date,
      verified: Boolean
    }]
  },
  seo: {
    slug: { type: String, unique: true },
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'active', 'suspended', 'rejected'],
    default: 'draft'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better query performance
serviceSchema.index({ vendor: 1, status: 1 });
serviceSchema.index({ type: 1, status: 1 });
serviceSchema.index({ 'location.city': 1, 'location.state': 1 });
serviceSchema.index({ 'ratings.average': -1 });
serviceSchema.index({ 'stats.bookings': -1 });
serviceSchema.index({ slug: 1 });
serviceSchema.index({ createdAt: -1 });

// Text search index
serviceSchema.index({
  name: 'text',
  description: 'text',
  'location.city': 'text',
  'location.state': 'text'
});

// Generate slug before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Ensure uniqueness by appending timestamp if needed
    if (this.isNew) {
      this.slug += '-' + Date.now();
    }
  }
  next();
});

// Update ratings when a new review is added
serviceSchema.methods.updateRatings = function(newRating, oldRating = null) {
  if (oldRating) {
    // Update existing rating
    this.ratings.distribution[oldRating]--;
    this.ratings.distribution[newRating]++;
  } else {
    // New rating
    this.ratings.count++;
    this.ratings.distribution[newRating]++;
  }

  // Recalculate average
  let totalScore = 0;
  let totalReviews = 0;
  
  for (let i = 1; i <= 5; i++) {
    totalScore += i * this.ratings.distribution[i];
    totalReviews += this.ratings.distribution[i];
  }

  this.ratings.average = totalReviews > 0 ? totalScore / totalReviews : 0;
  this.ratings.count = totalReviews;
};

// Update booking stats
serviceSchema.methods.updateBookingStats = function(amount) {
  this.stats.bookings++;
  this.stats.revenue += amount;
  this.stats.lastBooked = new Date();
};

export default mongoose.model('Service', serviceSchema);
