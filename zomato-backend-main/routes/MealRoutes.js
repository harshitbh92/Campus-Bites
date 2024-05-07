const express = require('express');
const { MealTypeController, createMeal, getAllMeal } = require('../controller/MealTypeController');
const router = express.Router();

router.post('/createMealType',createMeal);
// router.get('/',getAllMeal);
router.get('/get-meal-type-list',MealTypeController.getMealTypeList);

module.exports = router;