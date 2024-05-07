const express = require('express');
const { createLocation, LocationController } = require('../controller/LocationController');
const router = express.Router();
router.post('/addLocation',createLocation);
router.get('/get-location-list',LocationController);

module.exports= router;