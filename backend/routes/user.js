const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { profileUpdateValidation } = require('../middleware/validator');

// @desc    Update user diet/goal preferences
// @route   PUT /api/users/preferences
router.put('/preferences', auth, profileUpdateValidation, async (req, res) => {
  try {
    const { goal, dietPreference, weight, height } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.goal = goal || user.goal;
    user.dietPreference = dietPreference || user.dietPreference;
    user.weight = weight || user.weight;
    user.height = height || user.height;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;