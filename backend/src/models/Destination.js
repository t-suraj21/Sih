import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  region: {
    type: String,
    required: true,
    enum: ['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'],
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200,
    trim: true
  },
  highlights: [{
    type: String,
    trim: true
  }],
  attractions: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      enum: ['Historical', 'Religious', 'Natural', 'Adventure', 'Cultural', 'Entertainment'],
      default: 'Historical'
    },
    timings: {
      type: String,
      trim: true
    },
    entryFee: {
      type: String,
      trim: true
    },
    duration: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.0
    }
  }],
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
    description: {
      type: String,
      trim: true
    }
  },
  weather: {
    summer: {
      temperature: {
        min: Number,
        max: Number
      },
      description: String
    },
    monsoon: {
      rainfall: String,
      description: String
    },
    winter: {
      temperature: {
        min: Number,
        max: Number
      },
      description: String
    }
  },
  howToReach: {
    byAir: {
      airport: String,
      distance: String,
      airlines: [String]
    },
    byRail: {
      station: String,
      distance: String,
      trains: [String]
    },
    byRoad: {
      majorHighways: [String],
      busServices: [String]
    }
  },
  localTransport: {
    metro: {
      available: Boolean,
      stations: [String]
    },
    buses: {
      available: Boolean,
      routes: [String]
    },
    taxis: {
      available: Boolean,
      providers: [String]
    },
    autoRickshaws: {
      available: Boolean
    }
  },
  cuisine: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    restaurants: [{
      name: String,
      address: String,
      specialty: String,
      rating: Number
    }]
  }],
  shopping: [{
    market: {
      type: String,
      required: true
    },
    specialty: String,
    location: String,
    timings: String
  }],
  accommodation: {
    luxury: {
      count: Number,
      startingPrice: Number,
      examples: [String]
    },
    midRange: {
      count: Number,
      startingPrice: Number,
      examples: [String]
    },
    budget: {
      count: Number,
      startingPrice: Number,
      examples: [String]
    }
  },
  activities: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Adventure', 'Cultural', 'Religious', 'Nature', 'Entertainment', 'Wellness'],
      default: 'Cultural'
    },
    description: String,
    duration: String,
    price: String,
    operator: String
  }],
  festivals: [{
    name: {
      type: String,
      required: true
    },
    month: String,
    description: String,
    duration: String
  }],
  tips: [{
    category: {
      type: String,
      enum: ['Travel', 'Food', 'Shopping', 'Safety', 'Budget', 'Culture'],
      default: 'Travel'
    },
    tip: {
      type: String,
      required: true
    }
  }],
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
  statistics: {
    hotelsCount: {
      type: Number,
      default: 0
    },
    restaurantsCount: {
      type: Number,
      default: 0
    },
    attractionsCount: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    visitorCount: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better search performance
destinationSchema.index({ name: 'text', description: 'text', state: 'text' });
destinationSchema.index({ state: 1, region: 1, isActive: 1 });
destinationSchema.index({ coordinates: '2dsphere' });
destinationSchema.index({ tags: 1 });
destinationSchema.index({ isPopular: 1, isActive: 1 });

// Virtual for full location
destinationSchema.virtual('fullLocation').get(function() {
  return `${this.name}, ${this.state}`;
});

// Method to generate slug
destinationSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  next();
});

// Method to update statistics
destinationSchema.methods.updateStatistics = async function() {
  const Hotel = mongoose.model('Hotel');
  const hotelCount = await Hotel.countDocuments({ 
    city: this.name, 
    state: this.state, 
    isActive: true 
  });
  
  this.statistics.hotelsCount = hotelCount;
  this.statistics.attractionsCount = this.attractions.length;
  
  return this.save();
};

export default mongoose.model('Destination', destinationSchema);
