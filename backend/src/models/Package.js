import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  packageType: {
    type: String,
    required: true,
    enum: ['single', 'couple', 'family', 'group', 'corporate', 'custom'],
    default: 'single'
  },
  destination: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: 'India' },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  duration: {
    days: { type: Number, required: true, min: 1 },
    nights: { type: Number, required: true, min: 0 }
  },
  inclusions: {
    hotel: {
      included: { type: Boolean, default: true },
      options: [{
        hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
        name: String,
        price: Number,
        roomType: String,
        amenities: [String],
        image: String,
        rating: Number
      }],
      defaultOption: Number // index of default option
    },
    food: {
      included: { type: Boolean, default: true },
      options: [{
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
        name: String,
        price: Number,
        mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'all'], default: 'all' },
        cuisine: String,
        image: String,
        rating: Number
      }],
      defaultOption: Number
    },
    travel: {
      included: { type: Boolean, default: true },
      options: [{
        transportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
        name: String,
        price: Number,
        vehicleType: { type: String, enum: ['car', 'bus', 'train', 'flight', 'taxi'], default: 'car' },
        capacity: Number,
        image: String,
        rating: Number
      }],
      defaultOption: Number
    },
    guide: {
      included: { type: Boolean, default: true },
      options: [{
        guideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
        name: String,
        price: Number,
        languages: [String],
        experience: String,
        image: String,
        rating: Number
      }],
      defaultOption: Number
    }
  },
  pricing: {
    basePrice: { type: Number, required: true },
    pricePerPerson: { type: Number },
    pricePerDay: { type: Number },
    currency: { type: String, default: 'INR' },
    taxes: { type: Number, default: 0 },
    serviceCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true }
  },
  capacity: {
    minPersons: { type: Number, default: 1 },
    maxPersons: { type: Number, default: 10 }
  },
  availability: {
    isActive: { type: Boolean, default: true },
    startDate: Date,
    endDate: Date,
    blackoutDates: [Date],
    maxBookings: Number
  },
  features: {
    highlights: [String],
    amenities: [String],
    included: [String],
    excluded: [String]
  },
  images: [{
    url: String,
    caption: String,
    isPrimary: Boolean
  }],
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'suspended'],
    default: 'active'
  },
  metadata: {
    views: { type: Number, default: 0 },
    bookings: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
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

// Indexes
packageSchema.index({ packageType: 1, status: 1 });
packageSchema.index({ 'destination.city': 1, 'destination.state': 1 });
packageSchema.index({ 'pricing.finalPrice': 1 });
packageSchema.index({ status: 1, 'availability.isActive': 1 });
packageSchema.index({ createdAt: -1 });

// Text search index
packageSchema.index({
  name: 'text',
  description: 'text',
  'destination.city': 'text'
});

// Calculate final price
packageSchema.methods.calculateFinalPrice = function(selectedOptions = {}) {
  let totalPrice = this.pricing.basePrice || 0;
  
  // Calculate based on selected options
  if (selectedOptions.hotel && this.inclusions.hotel.options[selectedOptions.hotel]) {
    totalPrice += this.inclusions.hotel.options[selectedOptions.hotel].price || 0;
  }
  
  if (selectedOptions.food && this.inclusions.food.options[selectedOptions.food]) {
    totalPrice += this.inclusions.food.options[selectedOptions.food].price || 0;
  }
  
  if (selectedOptions.travel && this.inclusions.travel.options[selectedOptions.travel]) {
    totalPrice += this.inclusions.travel.options[selectedOptions.travel].price || 0;
  }
  
  if (selectedOptions.guide && this.inclusions.guide.options[selectedOptions.guide]) {
    totalPrice += this.inclusions.guide.options[selectedOptions.guide].price || 0;
  }
  
  // Add taxes and service charges
  totalPrice += this.pricing.taxes || 0;
  totalPrice += this.pricing.serviceCharge || 0;
  
  // Apply discount
  if (this.pricing.discount > 0) {
    totalPrice -= (totalPrice * this.pricing.discount / 100);
  }
  
  return Math.round(totalPrice);
};

export default mongoose.model('Package', packageSchema);

