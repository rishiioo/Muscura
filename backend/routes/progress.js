const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController.js');
const { auth } = require('../middleware/auth.js');

router.get('/', auth, progressController.getProgressLogs);
router.get('/chart', auth, progressController.getWeightChart);
router.post('/', auth, progressController.addProgressLog);
router.put('/:id', auth, progressController.updateProgressLog);
router.delete('/:id', auth, progressController.deleteProgressLog);

module.exports = router;