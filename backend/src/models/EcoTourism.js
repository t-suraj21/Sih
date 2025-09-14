import mongoose from 'mongoose';

const ecoTourismSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  type: {
    type: String,
    enum: ['Destination', 'Activity', 'Accommodation', 'Tour'],
    required: true
  },
  category: {
    type: String,
    enum: ['Wildlife Conservation', 'Sustainable Accommodation', 'Organic Farming', 'Carbon Neutral Travel', 'Community Tourism', 'Nature Education', 'Green Adventure', 'Cultural Heritage'],
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    maxlength: 200,
    trim: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  location: {
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
    region: {
      type: String,
      enum: ['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'],
      required: true
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    address: String
  },
  sustainability: {
    ecoRating: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    carbonFootprint: {
      type: String,
      enum: ['Very Low', 'Low', 'Medium', 'High'],
      required: true
    },
    certifications: [{
      name: {
        type: String,
        required: true
      },
      issuedBy: String,
      validUntil: Date,
      certificateUrl: String
    }],
    ecoFeatures: [{
      feature: {
        type: String,
        required: true
      },
      description: String,
      impact: String
    }],
    conservationImpact: {
      wildlifeProtected: String,
      treesPlanted: Number,
      co2Reduced: Number, // in kg
      waterConserved: Number, // in liters
      wasteReduced: Number, // in kg
      communitiesSupported: Number
    }
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    priceUnit: {
      type: String,
      enum: ['per person', 'per night', 'per day', 'per group', 'per activity'],
      default: 'per person'
    },
    seasonalPricing: [{
      season: {
        type: String,
        enum: ['Peak', 'Off-Season', 'Shoulder']
      },
      multiplier: {
        type: Number,
        default: 1.0
      },
      startDate: Date,
      endDate: Date
    }],
    inclusions: [String],
    exclusions: [String]
  },
  duration: {
    recommended: {
      type: String,
      required: true
    },
    minimum: String,
    maximum: String,
    flexible: {
      type: Boolean,
      default: false
    }
  },
  groupSize: {
    minimum: {
      type: Number,
      default: 1
    },
    maximum: {
      type: Number,
      default: 20
    },
    optimal: Number
  },
  activities: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    duration: String,
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Challenging', 'Expert'],
      default: 'Easy'
    },
    ecoImpact: String,
    included: {
      type: Boolean,
      default: true
    },
    additionalCost: Number
  }],
  accommodation: {
    type: {
      type: String,
      enum: ['Eco Lodge', 'Organic Farm Stay', 'Sustainable Resort', 'Community Homestay', 'Green Hotel', 'Camping', 'Tree House']
    },
    amenities: [String],
    sustainabilityFeatures: [String],
    roomTypes: [{
      roomType: String,
      capacity: Number,
      price: Number
    }]
  },
  bestTimeToVisit: {
    months: [{
      type: String,
      enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }],
    season: {
      type: String,
      enum: ['Summer', 'Monsoon', 'Winter', 'Year Round'],
      default: 'Year Round'
    },
    weatherDescription: String
  },
  requirements: {
    ageRestriction: {
      minimum: Number,
      maximum: Number
    },
    fitnessLevel: {
      type: String,
      enum: ['Any', 'Basic', 'Good', 'Excellent'],
      default: 'Any'
    },
    equipment: [String],
    documents: [String],
    medicalClearance: {
      type: Boolean,
      default: false
    }
  },
  guidelines: {
    ecoGuidelines: [String],
    safetyGuidelines: [String],
    culturalGuidelines: [String],
    photographyRules: [String]
  },
  operator: {
    name: {
      type: String,
      required: true
    },
    contact: {
      email: String,
      phone: String,
      website: String
    },
    certifications: [String],
    experience: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  rewards: {
    ecoPointsEarned: {
      type: Number,
      required: true,
      default: 0
    },
    badges: [String],
    certificates: [String]
  },
  availability: {
    available: {
      type: Boolean,
      default: true
    },
    seasonalAvailability: [{
      season: String,
      available: Boolean,
      reason: String
    }],
    bookingAdvance: {
      minimum: String,
      maximum: String
    }
  },
  ratings: {
    overall: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    sustainability: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    value: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  popularityScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better search performance
ecoTourismSchema.index({ name: 'text', description: 'text', 'location.city': 'text' });
ecoTourismSchema.index({ type: 1, category: 1, isActive: 1 });
ecoTourismSchema.index({ 'location.state': 1, 'location.region': 1 });
ecoTourismSchema.index({ 'location.coordinates': '2dsphere' });
ecoTourismSchema.index({ 'sustainability.ecoRating': -1 });
ecoTourismSchema.index({ 'ratings.overall': -1, featured: -1 });
ecoTourismSchema.index({ tags: 1 });
ecoTourismSchema.index({ featured: 1, isActive: 1 });

// Virtual for full location
ecoTourismSchema.virtual('fullLocation').get(function() {
  return `${this.location.city}, ${this.location.state}`;
});

// Method to generate slug
ecoTourismSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  next();
});

// Method to calculate eco points based on various factors
ecoTourismSchema.methods.calculateEcoPoints = function() {
  let points = 0;
  
  // Base points based on eco rating
  points += this.sustainability.ecoRating * 10;
  
  // Carbon footprint bonus
  const carbonMultiplier = {
    'Very Low': 50,
    'Low': 30,
    'Medium': 10,
    'High': 0
  };
  points += carbonMultiplier[this.sustainability.carbonFootprint] || 0;
  
  // Certification bonus
  points += this.sustainability.certifications.length * 20;
  
  // Conservation impact bonus
  if (this.sustainability.conservationImpact.treesPlanted) {
    points += Math.min(this.sustainability.conservationImpact.treesPlanted, 100);
  }
  
  this.rewards.ecoPointsEarned = Math.round(points);
  return points;
};

// Method to update ratings
ecoTourismSchema.methods.updateRatings = async function() {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { ecoTourism: this._id } },
    {
      $group: {
        _id: null,
        avgOverall: { $avg: '$rating.overall' },
        avgSustainability: { $avg: '$rating.sustainability' },
        avgExperience: { $avg: '$rating.experience' },
        avgValue: { $avg: '$rating.value' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    this.ratings.overall = Math.round(stats[0].avgOverall * 10) / 10;
    this.ratings.sustainability = Math.round(stats[0].avgSustainability * 10) / 10;
    this.ratings.experience = Math.round(stats[0].avgExperience * 10) / 10;
    this.ratings.value = Math.round(stats[0].avgValue * 10) / 10;
    this.ratings.totalReviews = stats[0].totalReviews;
  }

  return this.save();
};

export default mongoose.model('EcoTourism', ecoTourismSchema);
