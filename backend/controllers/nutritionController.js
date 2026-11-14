const Food = require('../models/Food');
const MealLog = require('../models/MealLog');

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find().limit(100);
    res.json(foods);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchFoods = async (req, res) => {
  try {
    const q = req.query.q || '';
    const foods = await Food.find({ name: new RegExp(q, 'i') }).limit(50);
    res.json(foods);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

function calcFromFood(food, grams) {
  const factor = grams / 100;
  return {
    calories: food.caloriesPer100g * factor,
    protein: (food.proteinPer100g || 0) * factor,
    carbs: (food.carbsPer100g || 0) * factor,
    fat: (food.fatPer100g || 0) * factor,
  };
}

exports.logMeal = async (req, res) => {
  try {
    const { date, mealType, items } = req.body;
    const userId = req.user.id;

    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
    const detailedItems = [];

    for (const it of items) {
      const food = await Food.findById(it.foodId);
      if (!food) continue;
      const { calories, protein, carbs, fat } = calcFromFood(food, it.grams);
      totalCalories += calories;
      totalProtein += protein;
      totalCarbs += carbs;
      totalFat += fat;
      detailedItems.push({
        food: food._id,
        grams: it.grams,
        calories,
        protein,
        carbs,
        fat,
      });
    }

    const meal = await MealLog.create({
      user: userId,
      date: date ? new Date(date) : new Date(new Date().toDateString()),
      mealType,
      items: detailedItems,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    });

    res.status(201).json(meal);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMeals = async (req, res) => {
  try {
    const { date } = req.query;
    const filter = { user: req.user.id };
    if (date) {
      const d = new Date(date);
      const start = new Date(d.toDateString());
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }
    const meals = await MealLog.find(filter).populate('items.food').sort({ date: -1 });
    res.json(meals);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDailySummary = async (req, res) => {
  try {
    const { date } = req.query;
    const d = date ? new Date(date) : new Date();
    const start = new Date(d.toDateString());
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const meals = await MealLog.find({
      user: req.user.id,
      date: { $gte: start, $lt: end }
    });

    const totals = meals.reduce((acc, m) => ({
      calories: acc.calories + (m.totalCalories || 0),
      protein: acc.protein + (m.totalProtein || 0),
      carbs: acc.carbs + (m.totalCarbs || 0),
      fat: acc.fat + (m.totalFat || 0),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    res.json({ date: start, totals, meals });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMeal = async (req, res) => {
  try {
    const meal = await MealLog.findOne({ _id: req.params.id, user: req.user.id });
    if (!meal) return res.status(404).json({ message: 'Not found' });
    // simplified update
    Object.assign(meal, req.body);
    await meal.save();
    res.json(meal);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    const meal = await MealLog.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!meal) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};
