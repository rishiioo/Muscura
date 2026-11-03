const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController.js');
const { auth } = require('../middleware/auth.js');
const {
  progressValidation
} = require('../middleware/validator.js');

router.get('/', auth, progressController.getProgressLogs);
router.get('/chart', auth, progressController.getWeightChart);
router.post('/', auth, progressValidation, progressController.addProgressLog);
router.put('/:id', auth, progressController.updateProgressLog);
router.delete('/:id', auth, progressController.deleteProgressLog);

module.exports = router;