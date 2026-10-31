const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const { auth, admin } = require('../middleware/auth.js');

router.use(auth, admin); // Apply admin protection to all routes

router.get('/stats', adminController.getStats);
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id/status', adminController.updateUserStatus);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;