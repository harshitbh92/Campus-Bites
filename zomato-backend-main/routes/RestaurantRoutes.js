const express = require('express');
const { createRestaurant, RestaurantController, getAllRestro, createMenuItem } = require('../controller/RestaurantController');

const router = express.Router();

router.post('/addRestaurant',createRestaurant);
router.post('/createMenuItem',createMenuItem);

router.get('/',getAllRestro);
router.get('/get-restaurant-list-by-loc-id/:id',RestaurantController.getRestaurantListByLocation);
router.get('/get-restaurant-detail/:rest_id',RestaurantController.getSingleRestaurantDetails);
router.get('/get-menu-item-list/:r_id',RestaurantController.getMenuItems);

//  router.post('/filter',RestaurantController.filter);
router.post("/filters", RestaurantController.getFilters);

module.exports = router;