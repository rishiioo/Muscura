const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  duration: {
    type: Number,
    required: [true, 'Duration in days is required'],
    min: 1,
  },
  features: [
    {
      type: String,
      trim: true,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual for end date
subscriptionSchema.virtual('endDate').get(function () {
  if (!this.startDate) return null;
  const endDate = new Date(this.startDate);
  endDate.setDate(endDate.getDate() + this.duration);
  return endDate;
});

module.exports = mongoose.model('Subscription', subscriptionSchema);