const express = require('express');
const router = express.Router();
const challengesController = require('../controllers/challengesController');
const { auth } = require('../middleware/auth');

router.get('/', auth, challengesController.listChallenges);
router.post('/join/:id', auth, challengesController.joinChallenge);
router.get('/progress', auth, challengesController.getUserProgress);
router.post('/progress', auth, challengesController.updateProgress);
router.get('/leaderboard', auth, challengesController.getLeaderboard);

module.exports = router;
