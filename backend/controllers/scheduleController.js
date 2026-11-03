const UserSchedule = require('../models/UserSchedule');
const Workout = require('../models/Workout');

const VALID_PLAN_TYPES = ['upper', 'lower', 'bro'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Map planType to day assignments
const PLAN_DAYS = {
  upper: ['Monday', 'Wednesday', 'Friday'],
  lower: ['Tuesday', 'Thursday', 'Saturday'],
  bro: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
};

// GET /api/schedule/me
exports.getMySchedule = async (req, res) => {
  try {
    const schedule = await UserSchedule.findOne({ user: req.user.id })
      .populate('items.workout')
      .sort({ updatedAt: -1 });
    if (!schedule) {
      return res.json(null);
    }
    res.json(schedule);
  } catch (error) {
    console.error('GetMySchedule error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/schedule/select-plan
exports.selectPlan = async (req, res) => {
  try {
    const { planType } = req.body;

    if (!planType || !VALID_PLAN_TYPES.includes(planType)) {
      return res.status(400).json({ message: 'Invalid plan type. Must be upper, lower, or bro.' });
    }

    // Determine effective difficulty from gymExperience if provided (via request body or user profile)
let difficulty = req.body.difficulty || 'intermediate';
const gymExperience = req.body.gymExperience || (req.user && req.user.gymExperience);
if (gymExperience) {
  if (gymExperience === 'first_time') difficulty = 'beginner';
  else if (gymExperience === '1-6_months') difficulty = 'intermediate';
  else if (gymExperience === '6+_months') difficulty = 'advanced';
}
    const targetDays = PLAN_DAYS[planType];

    // Find workouts matching planType and difficulty
    const workouts = await Workout.find({
      planType,
      difficulty,
    }).sort({ day: 1 });

    if (workouts.length === 0) {
      return res.status(400).json({ message: `No workouts found for plan "${planType}" at level "${difficulty}".` });
    }

    // Build schedule items: assign each workout to its day, rest for other days
    const items = DAYS.map((day) => {
      const workout = workouts.find((w) => w.day === day);
      if (workout) {
        return { day, workout: workout._id, isRest: false };
      }
      return { day, workout: null, isRest: true };
    });

    // Upsert the user's schedule
    const schedule = await UserSchedule.findOneAndUpdate(
      { user: req.user.id },
      {
        user: req.user.id,
        planType,
        items,
        updatedAt: new Date(),
      },
      { new: true, upsert: true }
    ).populate('items.workout');

    res.json(schedule);
  } catch (error) {
    console.error('SelectPlan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/schedule/day/:day
exports.setDayWorkout = async (req, res) => {
  try {
    const { day } = req.params;
    const { workoutId } = req.body;

    if (!DAYS.includes(day)) {
      return res.status(400).json({ message: 'Invalid day.' });
    }

    if (workoutId) {
      const workout = await Workout.findById(workoutId);
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
    }

    let schedule = await UserSchedule.findOne({ user: req.user.id });
    if (!schedule) {
      schedule = new UserSchedule({ user: req.user.id, planType: null, items: [] });
    }

    const itemIndex = schedule.items.findIndex((item) => item.day === day);
    if (itemIndex > -1) {
      schedule.items[itemIndex].workout = workoutId || null;
      schedule.items[itemIndex].isRest = !workoutId;
    } else {
      schedule.items.push({
        day,
        workout: workoutId || null,
        isRest: !workoutId,
      });
    }

    schedule.updatedAt = new Date();
    await schedule.save();
    await schedule.populate('items.workout');

    res.json(schedule);
  } catch (error) {
    console.error('SetDayWorkout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/schedule/day/:day
exports.removeDayWorkout = async (req, res) => {
  try {
    const { day } = req.params;

    if (!DAYS.includes(day)) {
      return res.status(400).json({ message: 'Invalid day.' });
    }

    const schedule = await UserSchedule.findOne({ user: req.user.id });
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const itemIndex = schedule.items.findIndex((item) => item.day === day);
    if (itemIndex > -1) {
      schedule.items[itemIndex].workout = null;
      schedule.items[itemIndex].isRest = true;
    } else {
      schedule.items.push({ day, workout: null, isRest: true });
    }

    schedule.updatedAt = new Date();
    await schedule.save();
    await schedule.populate('items.workout');

    res.json(schedule);
  } catch (error) {
    console.error('RemoveDayWorkout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/schedule/me
exports.clearSchedule = async (req, res) => {
  try {
    await UserSchedule.deleteOne({ user: req.user.id });
    res.json({ message: 'Schedule cleared' });
  } catch (error) {
    console.error('ClearSchedule error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};