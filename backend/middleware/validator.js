const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  validate
];

const googleLoginValidation = [
  body('idToken').notEmpty().withMessage('Google ID token is required'),
  validate
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long'),
  validate
];

const progressValidation = [
  body('weight').isFloat({ min: 20, max: 500 }).withMessage('Weight must be between 20 and 500 kg'),
  body('workoutLogs').optional().isArray().withMessage('Workout logs must be an array'),
  body('notes').optional().isString(),
  validate
];

const workoutValidation = [
  body('name').notEmpty().withMessage('Workout name is required'),
  body('goal').isIn(['cut', 'bulk', 'healthy', 'upper body', 'lower body', 'full body']).withMessage('Goal must be cut, bulk, healthy, upper body, lower body, or full body'),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  body('planType').optional().isIn(['upper', 'lower', 'bro']).withMessage('Invalid planType'),
  validate
];

const profileUpdateValidation = [
  body('weight').optional().isFloat({ min: 20, max: 500 }).withMessage('Weight must be between 20 and 500 kg'),
  body('height').optional().isFloat({ min: 50, max: 300 }).withMessage('Height must be between 50 and 300 cm'),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  progressValidation,
  workoutValidation,
  profileUpdateValidation
};