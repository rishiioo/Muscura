const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController.js');
const { auth, admin } = require('../middleware/auth.js');

router.get('/', subscriptionController.getSubscriptions);
router.get('/me', auth, subscriptionController.getMySubscription);
router.get('/:id', subscriptionController.getSubscriptionById);
router.post('/', auth, admin, subscriptionController.createSubscription);
router.post('/purchase', auth, subscriptionController.purchaseSubscription);
router.put('/:id', auth, admin, subscriptionController.updateSubscription);
router.delete('/:id', auth, admin, subscriptionController.deleteSubscription);

module.exports = router;