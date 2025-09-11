import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR',
    enum: ['INR', 'USD', 'EUR']
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'emi'],
    required: true
  },
  // Razorpay specific fields
  razorpay: {
    orderId: {
      type: String,
      required: true
    },
    paymentId: String,
    signature: String
  },
  // Payment gateway response
  gatewayResponse: mongoose.Schema.Types.Mixed,
  status: {
    type: String,
    enum: ['created', 'pending', 'authorized', 'captured', 'failed', 'cancelled', 'refunded'],
    default: 'created'
  },
  failureReason: {
    type: String
  },
  refunds: [{
    refundId: String,
    amount: Number,
    reason: String,
    status: {
      type: String,
      enum: ['pending', 'processed', 'failed']
    },
    processedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    ipAddress: String,
    userAgent: String,
    deviceInfo: String
  },
  // Timestamps for payment lifecycle
  timestamps: {
    created: {
      type: Date,
      default: Date.now
    },
    authorized: Date,
    captured: Date,
    failed: Date,
    refunded: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
paymentSchema.index({ booking: 1 });
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ 'razorpay.orderId': 1 });
paymentSchema.index({ 'razorpay.paymentId': 1 });
paymentSchema.index({ status: 1 });

// Virtual for total refunded amount
paymentSchema.virtual('totalRefunded').get(function() {
  return this.refunds
    .filter(refund => refund.status === 'processed')
    .reduce((total, refund) => total + refund.amount, 0);
});

// Method to check if payment is successful
paymentSchema.methods.isSuccessful = function() {
  return ['authorized', 'captured'].includes(this.status);
};

// Method to check if payment can be refunded
paymentSchema.methods.canBeRefunded = function() {
  const refundedAmount = this.totalRefunded;
  return this.isSuccessful() && refundedAmount < this.amount;
};

// Method to get refundable amount
paymentSchema.methods.getRefundableAmount = function() {
  if (!this.canBeRefunded()) return 0;
  return this.amount - this.totalRefunded;
};

// Update timestamp based on status
paymentSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    switch (this.status) {
      case 'authorized':
        this.timestamps.authorized = new Date();
        break;
      case 'captured':
        this.timestamps.captured = new Date();
        break;
      case 'failed':
        this.timestamps.failed = new Date();
        break;
      case 'refunded':
        this.timestamps.refunded = new Date();
        break;
    }
  }
  next();
});

export default mongoose.model("Payment", paymentSchema);
