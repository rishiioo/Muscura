const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const { auth } = require('../middleware/auth.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getMe);
router.put('/profile', auth, authController.updateProfile);
router.put('/changepassword', auth, authController.changePassword);

module.exports = router;