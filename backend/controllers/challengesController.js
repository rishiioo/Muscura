const Challenge = require('../models/Challenge');
const UserChallengeProgress = require('../models/UserChallengeProgress');

exports.listChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({ isActive: true });
    res.json(challenges);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.joinChallenge = async (req, res) => {
  try {
    const prog = await UserChallengeProgress.findOneAndUpdate(
      { user: req.user.id, challenge: req.params.id },
      { $setOnInsert: { user: req.user.id, challenge: req.params.id } },
      { upsert: true, new: true }
    );
    res.json(prog);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const progresses = await UserChallengeProgress.find({ user: req.user.id }).populate('challenge');
    res.json(progresses);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { challengeId, progressValue } = req.body;
    const prog = await UserChallengeProgress.findOneAndUpdate(
      { user: req.user.id, challenge: challengeId },
      { $inc: { progressValue }, lastUpdated: new Date() },
      { new: true }
    );
    res.json(prog);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const { challengeId } = req.query;
    const filter = challengeId ? { challenge: challengeId } : {};
    const leaders = await UserChallengeProgress.find(filter)
      .sort({ progressValue: -1 })
      .limit(50)
      .populate('user', 'name');
    res.json(leaders);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};
