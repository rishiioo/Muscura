const mongoose = require('mongoose');

const prSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
    trim: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  reps: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: String,
}, { timestamps: true });

prSchema.index({ user: 1, exerciseName: 1, weight: -1, reps: -1 });

module.exports = mongoose.model('PR', prSchema);
