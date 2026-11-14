const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsController');
const { auth } = require('../middleware/auth');

router.get('/', auth, metricsController.getMetrics);
router.post('/', auth, metricsController.addMetric);
router.get('/chart', auth, metricsController.getMeasurementsChart);
router.post('/pr', auth, metricsController.addPR);
router.get('/pr', auth, metricsController.getPRs);

module.exports = router;
