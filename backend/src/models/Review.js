import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
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
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  rating: {
    overall: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    cleanliness: {
      type: Number,
      min: 1,
      max: 5
    },
    service: {
      type: Number,
      min: 1,
      max: 5
    },
    location: {
      type: Number,
      min: 1,
      max: 5
    },
    valueForMoney: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  pros: [{
    type: String,
    maxlength: 100
  }],
  cons: [{
    type: String,
    maxlength: 100
  }],
  images: [{
    url: String,
    caption: String
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  helpfulVotes: {
    type: Number,
    default: 0
  },
  reportCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'hidden'],
    default: 'pending'
  },
  moderationNotes: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index to ensure one review per booking
reviewSchema.index({ user: 1, booking: 1 }, { unique: true });

// Index for efficient queries
reviewSchema.index({ hotel: 1, status: 1, createdAt: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ 'rating.overall': -1 });

// Virtual for average rating across all categories
reviewSchema.virtual('averageRating').get(function() {
  const ratings = [
    this.rating.overall,
    this.rating.cleanliness,
    this.rating.service,
    this.rating.location,
    this.rating.valueForMoney
  ].filter(rating => rating > 0);
  
  return ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    : this.rating.overall;
});

// Method to check if review can be edited
reviewSchema.methods.canBeEdited = function() {
  const now = new Date();
  const createdAt = new Date(this.createdAt);
  const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
  
  return hoursDiff < 24 && this.status === 'approved'; // Can edit within 24 hours
};

// Update hotel rating after review changes
reviewSchema.post('save', async function() {
  if (this.status === 'approved') {
    const Hotel = mongoose.model('Hotel');
    const hotel = await Hotel.findById(this.hotel);
    if (hotel) {
      await hotel.updateRating();
    }
  }
});

reviewSchema.post('remove', async function() {
  const Hotel = mongoose.model('Hotel');
  const hotel = await Hotel.findById(this.hotel);
  if (hotel) {
    await hotel.updateRating();
  }
});

export default mongoose.model("Review", reviewSchema);
