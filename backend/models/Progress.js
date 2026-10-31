const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
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
  workoutLogs: [
    {
      workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
      exercises: [
        {
          exerciseName: String,
          setsCompleted: Number,
          repsCompleted: String,
          weightUsed: Number,
          notes: String,
        },
      ],
      duration: Number,
      notes: String,
    },
  ],
  notes: {
    type: String,
    trim: true,
  },
});

progressSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('Progress', progressSchema);