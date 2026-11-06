const mongoose = require('mongoose');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Workout = require('../models/Workout');
const Progress = require('../models/Progress');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: 'user' });
    const activeSubCount = await User.countDocuments({
      role: 'user',
      subscription: { $ne: null },
      subscriptionEnd: { $gt: new Date() }
    });
    const workoutCount = await Workout.countDocuments();
    const subscriptionCount = await Subscription.countDocuments();

    // Get recent members
    const recentMembers = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt');

    res.json({
      userCount,
      activeSubCount,
      workoutCount,
      subscriptionCount,
      recentMembers,
    });
  } catch (error) {
    console.error('GetStats error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all users with pagination
// @route   GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await User.countDocuments({ role: 'user' });
    const users = await User.find({ role: 'user' })
      .select('-password')
      .populate('subscription')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      data: users,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      total,
    });
  } catch (error) {
    console.error('GetAllUsers error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get user by ID with all details
// @route   GET /api/admin/users/:id
exports.getUserDetails = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('subscription');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const progress = await Progress.find({ user: user._id }).sort({ date: -1 });

    res.json({
      user,
      progress,
    });
  } catch (error) {
    console.error('GetUserDetails error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
exports.updateUserStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const { isActive } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = isActive;
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      weight: user.weight,
      height: user.height,
      goal: user.goal,
      gymExperience: user.gymExperience,
      dietPreference: user.dietPreference,
      subscription: user.subscription,
      isActive: user.isActive,
    });
  } catch (error) {
    console.error('UpdateUserStatus error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user's progress records too
    await Progress.deleteMany({ user: user._id });
    await user.deleteOne();
    
    res.json({ message: 'User and all related records deleted' });
  } catch (error) {
    console.error('DeleteUser error:', error);
    res.status(500).json({ message: "Server error" });
  }
};