const BodyMetric = require('../models/BodyMetric');
const PR = require('../models/PR');

exports.getMetrics = async (req, res) => {
  try {
    const metrics = await BodyMetric.find({ user: req.user.id }).sort({ date: -1 });
    res.json(metrics);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMetric = async (req, res) => {
  try {
    const metric = await BodyMetric.create({ user: req.user.id, ...req.body });
    res.status(201).json(metric);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMeasurementsChart = async (req, res) => {
  try {
    const { measurement } = req.query;
    const metrics = await BodyMetric.find({ user: req.user.id })
      .sort({ date: 1 })
      .select('date weight measurements bodyFat');
    res.json(metrics);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addPR = async (req, res) => {
  try {
    const { exerciseName, weight, reps, date, notes } = req.body;
    const pr = await PR.create({ user: req.user.id, exerciseName, weight, reps, date, notes });
    res.status(201).json(pr);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPRs = async (req, res) => {
  try {
    const prs = await PR.find({ user: req.user.id }).sort({ date: -1 }).limit(100);
    res.json(prs);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};
