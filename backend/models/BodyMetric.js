const mongoose = require('mongoose');

const bodyMetricSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  weight: {
    type: Number,
  },
  bodyFat: {
    type: Number,
  },
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    biceps: Number,
    thighs: Number,
    neck: Number,
  },
  photoUrl: {
    type: String,
  },
  notes: String,
}, { timestamps: true });

bodyMetricSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('BodyMetric', bodyMetricSchema);
