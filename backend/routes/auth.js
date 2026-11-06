const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const { auth } = require('../middleware/auth.js');
const {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  profileUpdateValidation,
  googleLoginValidation
} = require('../middleware/validator.js');

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/google', googleLoginValidation, authController.googleLogin);
router.post('/forgotpassword', authController.forgotPassword);
router.put('/resetpassword/:resettoken', authController.resetPassword);
router.get('/me', auth, authController.getMe);
router.put('/profile', auth, profileUpdateValidation, authController.updateProfile);
router.put('/changepassword', auth, changePasswordValidation, authController.changePassword);

module.exports = router;