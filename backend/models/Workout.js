const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sets: {
    type: Number,
    required: true,
    min: 1,
  },
  reps: {
    type: String,
    required: true,
    trim: true,
  },
  rest: {
    type: String,
    trim: true,
  },
  youtubeLink: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
});

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workout name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  goal: {
    type: String,
    enum: ['cut', 'bulk', 'healthy', 'upper body', 'lower body', 'full body'],
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  exercises: [exerciseSchema],
  duration: {
    type: Number,
    default: 60,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Workout', workoutSchema);