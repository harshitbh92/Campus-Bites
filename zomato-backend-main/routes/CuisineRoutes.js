const express = require('express');
const { createCuisine, CuisineController } = require('../controller/CuisineController');
const router = express.Router();

router.post('/createCuisine',createCuisine);
// router.get('/',getAllMeal);
router.get('/get-cuisine-list/',CuisineController.getCuisineList);
module.exports = router;