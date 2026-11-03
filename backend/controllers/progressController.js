const Progress = require('../models/Progress');

// @desc    Get user's progress logs
// @route   GET /api/progress
exports.getProgressLogs = async (req, res) => {
  try {
    const { limit } = req.query;
    let query = Progress.find({ user: req.user.id }).sort({ date: -1 });

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const progress = await query.exec();
    res.json(progress);
  } catch (error) {
    console.error('GetProgressLogs error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add a progress log
// @route   POST /api/progress
exports.addProgressLog = async (req, res) => {
  try {
    const { weight, workoutLogs, notes } = req.body;

    const progress = new Progress({
      user: req.user.id,
      weight,
      workoutLogs,
      notes,
    });

    const savedProgress = await progress.save();
    res.status(201).json(savedProgress);
  } catch (error) {
    console.error('AddProgressLog error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a progress log
// @route   PUT /api/progress/:id
exports.updateProgressLog = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({ message: 'Progress log not found' });
    }

    // Check if user owns this log
    if (progress.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { weight, workoutLogs, notes } = req.body;

    progress.weight = weight !== undefined ? weight : progress.weight;
    progress.workoutLogs = workoutLogs || progress.workoutLogs;
    progress.notes = notes || progress.notes;

    const updatedProgress = await progress.save();
    res.json(updatedProgress);
  } catch (error) {
    console.error('UpdateProgressLog error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a progress log
// @route   DELETE /api/progress/:id
exports.deleteProgressLog = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({ message: 'Progress log not found' });
    }

    if (progress.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await progress.deleteOne();
    res.json({ message: 'Progress log deleted successfully' });
  } catch (error) {
    console.error('DeleteProgressLog error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get weight progress chart data
// @route   GET /api/progress/chart
exports.getWeightChart = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id })
      .sort({ date: 1 })
      .select('date weight');

    res.json(progress);
  } catch (error) {
    console.error('GetWeightChart error:', error);
    res.status(500).json({ message: "Server error" });
  }
};