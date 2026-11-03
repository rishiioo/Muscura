const mongoose = require('mongoose');

const scheduleItemSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    default: null,
  },
  isRest: {
    type: Boolean,
    default: false,
  },
});

const userScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  planType: {
    type: String,
    enum: ['upper', 'lower', 'bro', null],
    default: null,
  },
  items: [scheduleItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserSchedule', userScheduleSchema);