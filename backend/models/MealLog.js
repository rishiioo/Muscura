const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  grams: {
    type: Number,
    required: true,
    min: 1,
  },
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
});

const mealLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(new Date().toDateString()),
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true,
  },
  items: [mealItemSchema],
  totalCalories: {
    type: Number,
    default: 0,
  },
  totalProtein: {
    type: Number,
    default: 0,
  },
  totalCarbs: {
    type: Number,
    default: 0,
  },
  totalFat: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

mealLogSchema.index({ user: 1, date: 1, mealType: 1 });

module.exports = mongoose.model('MealLog', mealLogSchema);
