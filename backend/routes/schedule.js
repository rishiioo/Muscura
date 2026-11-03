const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const { auth } = require('../middleware/auth');

router.get('/me', auth, scheduleController.getMySchedule);
router.post('/select-plan', auth, scheduleController.selectPlan);
router.put('/day/:day', auth, scheduleController.setDayWorkout);
router.delete('/day/:day', auth, scheduleController.removeDayWorkout);
router.delete('/me', auth, scheduleController.clearSchedule);

module.exports = router;