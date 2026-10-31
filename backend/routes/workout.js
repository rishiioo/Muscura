const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController.js');
const { auth, admin } = require('../middleware/auth.js');

router.get('/', workoutController.getWorkouts);
router.get('/recommend', workoutController.getRecommendedWorkouts);
router.get('/:id', workoutController.getWorkoutById);
router.post('/', auth, admin, workoutController.createWorkout);
router.put('/:id', auth, admin, workoutController.updateWorkout);
router.delete('/:id', auth, admin, workoutController.deleteWorkout);

module.exports = router;