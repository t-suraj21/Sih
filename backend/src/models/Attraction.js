import mongoose from 'mongoose';

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
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
  category: {
    type: String,
    enum: ['Historical', 'Religious', 'Natural', 'Adventure', 'Cultural', 'Entertainment', 'Museum', 'Park', 'Beach', 'Hill Station'],
    required: true
  },
  subcategory: {
    type: String,
    enum: ['Fort', 'Palace', 'Temple', 'Church', 'Mosque', 'Gurudwara', 'Waterfall', 'Lake', 'Mountain', 'Garden', 'Wildlife', 'Amusement Park', 'Shopping Mall', 'Market', 'Cave', 'Monument'],
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
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    },
    address: {
      type: String,
      required: true
    }
  },
  timings: {
    opening: {
      type: String,
      required: true
    },
    closing: {
      type: String,
      required: true
    },
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    specialNotes: String
  },
  entryFee: {
    indianAdult: {
      type: Number,
      default: 0
    },
    indianChild: {
      type: Number,
      default: 0
    },
    foreignAdult: {
      type: Number,
      default: 0
    },
    foreignChild: {
      type: Number,
      default: 0
    },
    camera: {
      type: Number,
      default: 0
    },
    video: {
      type: Number,
      default: 0
    },
    notes: String
  },
  duration: {
    recommended: {
      type: String,
      required: true
    },
    minimum: String,
    maximum: String
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
    description: String
  },
  facilities: [{
    type: String,
    enum: ['Parking', 'Restaurant', 'Cafeteria', 'Gift Shop', 'Audio Guide', 'Guided Tours', 'Wheelchair Access', 'Restrooms', 'First Aid', 'ATM', 'WiFi', 'Photography Allowed', 'Video Allowed']
  }],
  activities: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    duration: String,
    price: String,
    operator: String,
    requirements: String
  }],
  nearbyAttractions: [{
    name: {
      type: String,
      required: true
    },
    distance: String,
    type: {
      type: String,
      enum: ['Historical', 'Religious', 'Natural', 'Adventure', 'Cultural', 'Entertainment']
    }
  }],
  transportation: {
    byAir: {
      airport: String,
      distance: String
    },
    byRail: {
      station: String,
      distance: String
    },
    byRoad: {
      majorHighways: [String],
      busServices: [String]
    },
    localTransport: {
      available: Boolean,
      options: [String],
      cost: String
    }
  },
  accessibility: {
    wheelchair: {
      available: Boolean,
      description: String
    },
    elderly: {
      friendly: Boolean,
      description: String
    },
    children: {
      friendly: Boolean,
      description: String
    }
  },
  safety: {
    guidelines: [String],
    emergencyContacts: [String],
    restrictions: [String]
  },
  history: {
    built: String,
    builtBy: String,
    significance: String,
    architecture: String,
    interestingFacts: [String]
  },
  ratings: {
    overall: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    cleanliness: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    accessibility: {
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
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isPopular: {
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
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better search performance
attractionSchema.index({ name: 'text', description: 'text', city: 'text' });
attractionSchema.index({ destination: 1, category: 1, isActive: 1 });
attractionSchema.index({ city: 1, state: 1, category: 1 });
attractionSchema.index({ location: '2dsphere' });
attractionSchema.index({ tags: 1 });
attractionSchema.index({ isPopular: 1, featured: 1, isActive: 1 });
attractionSchema.index({ 'ratings.overall': -1 });

// Virtual for full location
attractionSchema.virtual('fullLocation').get(function() {
  return `${this.city}, ${this.state}`;
});

// Virtual for average rating
attractionSchema.virtual('averageRating').get(function() {
  return this.ratings.overall;
});

// Method to update ratings
attractionSchema.methods.updateRatings = async function() {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { attraction: this._id } },
    {
      $group: {
        _id: null,
        avgOverall: { $avg: '$rating.overall' },
        avgCleanliness: { $avg: '$rating.cleanliness' },
        avgAccessibility: { $avg: '$rating.accessibility' },
        avgValue: { $avg: '$rating.value' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    this.ratings.overall = Math.round(stats[0].avgOverall * 10) / 10;
    this.ratings.cleanliness = Math.round(stats[0].avgCleanliness * 10) / 10;
    this.ratings.accessibility = Math.round(stats[0].avgAccessibility * 10) / 10;
    this.ratings.value = Math.round(stats[0].avgValue * 10) / 10;
    this.ratings.totalReviews = stats[0].totalReviews;
  } else {
    this.ratings.overall = 0;
    this.ratings.cleanliness = 0;
    this.ratings.accessibility = 0;
    this.ratings.value = 0;
    this.ratings.totalReviews = 0;
  }

  return this.save();
};

export default mongoose.model('Attraction', attractionSchema);
