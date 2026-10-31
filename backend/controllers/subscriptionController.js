const Subscription = require('../models/Subscription');
const User = require('../models/User');

// @desc    Get all subscriptions
// @route   GET /api/subscriptions
exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ isActive: true }).sort({ price: 1 });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get subscription by ID
// @route   GET /api/subscriptions/:id
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a subscription (Admin only)
// @route   POST /api/subscriptions
exports.createSubscription = async (req, res) => {
  try {
    const { name, description, price, duration, features } = req.body;
    const subscription = new Subscription({ name, description, price, duration, features });
    const savedSubscription = await subscription.save();
    res.status(201).json(savedSubscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a subscription (Admin only)
// @route   PUT /api/subscriptions/:id
exports.updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    const { name, description, price, duration, features, isActive } = req.body;
    subscription.name = name || subscription.name;
    subscription.description = description || subscription.description;
    subscription.price = price !== undefined ? price : subscription.price;
    subscription.duration = duration || subscription.duration;
    subscription.features = features || subscription.features;
    subscription.isActive = isActive !== undefined ? isActive : subscription.isActive;
    const updatedSubscription = await subscription.save();
    res.json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a subscription (Admin only)
// @route   DELETE /api/subscriptions/:id
exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    await subscription.deleteOne();
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Purchase a subscription
// @route   POST /api/subscriptions/purchase
exports.purchaseSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const userId = req.user.id;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.subscription = subscription._id;
    await user.save();

    res.json({
      message: 'Subscription purchased successfully',
      subscription,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        subscription: subscription._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's subscription status
// @route   GET /api/subscriptions/me
exports.getMySubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('subscription');
    if (!user.subscription) {
      return res.json({ subscription: null, message: 'No active subscription' });
    }

    const subscription = user.subscription;
    const startDate = user.createdAt;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + subscription.duration);

    res.json({
      subscription,
      startDate,
      endDate,
      daysRemaining: Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24)),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};