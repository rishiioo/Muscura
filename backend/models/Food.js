const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  caloriesPer100g: {
    type: Number,
    required: true,
    min: 0,
  },
  proteinPer100g: {
    type: Number,
    default: 0,
  },
  carbsPer100g: {
    type: Number,
    default: 0,
  },
  fatPer100g: {
    type: Number,
    default: 0,
  },
  isVeg: {
    type: Boolean,
    default: true,
  },
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
