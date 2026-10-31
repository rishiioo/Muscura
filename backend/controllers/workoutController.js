const Workout = require('../models/Workout');

// @desc    Get all workouts with filtering
// @route   GET /api/workouts
exports.getWorkouts = async (req, res) => {
  try {
    const { goal, difficulty, day, search } = req.query;
    let query = {};

    if (goal) query.goal = goal;
    if (difficulty) query.difficulty = difficulty;
    if (day) query.day = day;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const workouts = await Workout.find(query).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    console.error('GetWorkouts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get workout by ID
// @route   GET /api/workouts/:id
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    console.error('GetWorkoutById error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new workout (Admin only)
// @route   POST /api/workouts
exports.createWorkout = async (req, res) => {
  try {
    const { name, description, goal, difficulty, day, exercises, duration } = req.body;

    const workout = new Workout({
      name,
      description,
      goal,
      difficulty,
      day,
      exercises,
      duration,
    });

    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    console.error('CreateWorkout error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a workout (Admin only)
// @route   PUT /api/workouts/:id
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    const { name, description, goal, difficulty, day, exercises, duration } = req.body;

    workout.name = name || workout.name;
    workout.description = description || workout.description;
    workout.goal = goal || workout.goal;
    workout.difficulty = difficulty || workout.difficulty;
    workout.day = day || workout.day;
    workout.exercises = exercises || workout.exercises;
    workout.duration = duration || workout.duration;

    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } catch (error) {
    console.error('UpdateWorkout error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a workout (Admin only)
// @route   DELETE /api/workouts/:id
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    await workout.deleteOne();
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('DeleteWorkout error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get recommended workouts based on user goal and level
// @route   GET /api/workouts/recommend
exports.getRecommendedWorkouts = async (req, res) => {
  try {
    const { goal, difficulty, dietPreference } = req.query;

    // Map goals to workout types
    let workoutGoals = [];
    if (goal === 'cut') {
      workoutGoals = ['full body', 'upper body', 'lower body'];
    } else if (goal === 'bulk') {
      workoutGoals = ['upper body', 'lower body', 'full body'];
    } else if (goal === 'healthy') {
      workoutGoals = ['upper body', 'lower body', 'full body'];
    } else {
      workoutGoals = ['upper body', 'lower body', 'full body'];
    }

    const query = {
      goal: { $in: workoutGoals },
      difficulty: difficulty || 'beginner',
    };

    const workouts = await Workout.find(query).sort({ day: 1 });
    res.json(workouts);
  } catch (error) {
    console.error('GetRecommendedWorkouts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};