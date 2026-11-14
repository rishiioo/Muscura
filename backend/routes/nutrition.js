const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');
const { auth } = require('../middleware/auth');

router.get('/foods', auth, nutritionController.getFoods);
router.get('/foods/search', auth, nutritionController.searchFoods);
router.post('/meals', auth, nutritionController.logMeal);
router.get('/meals', auth, nutritionController.getMeals);
router.get('/meals/summary', auth, nutritionController.getDailySummary);
router.put('/meals/:id', auth, nutritionController.updateMeal);
router.delete('/meals/:id', auth, nutritionController.deleteMeal);

module.exports = router;
