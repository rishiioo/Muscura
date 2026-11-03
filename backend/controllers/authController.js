const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const sendEmail = require('../utils/mailer');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password, phone });
    await user.save();

    // Send non-blocking welcome email
    sendEmail(
      email,
      'Welcome to Muscura!',
      `Hi ${name},\n\nWelcome to Muscura! We're excited to help you achieve your fitness goals.\n\nBest regards,\nMuscura Team`
    ).catch(err => console.error('Welcome email failed:', err));

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('subscription');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.isActive === false) {
      return res.status(403).json({ message: 'Account deactivated' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      weight: user.weight,
      height: user.height,
      goal: user.goal,
      dietPreference: user.dietPreference,
      subscription: user.subscription,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('subscription');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      weight: user.weight,
      height: user.height,
      goal: user.goal,
      dietPreference: user.dietPreference,
      subscription: user.subscription,
      isActive: user.isActive,
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, weight, height, goal, dietPreference, gymExperience } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name !== undefined ? name : user.name;
    user.phone = phone !== undefined ? phone : user.phone;
    user.weight = weight !== undefined ? weight : user.weight;
    user.height = height !== undefined ? height : user.height;
    user.goal = goal !== undefined ? goal : user.goal;
    user.dietPreference = dietPreference !== undefined ? dietPreference : user.dietPreference;
    user.gymExperience = gymExperience !== undefined ? gymExperience : user.gymExperience;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      weight: updatedUser.weight,
      height: updatedUser.height,
      goal: updatedUser.goal,
      gymExperience: updatedUser.gymExperience,
      dietPreference: updatedUser.dietPreference,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    console.error('UpdateProfile error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Change password
// @route   PUT /api/auth/changepassword
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('ChangePassword error:', error);
    res.status(500).json({ message: "Server error" });
  }
};