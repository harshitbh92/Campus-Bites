// const LocationModel = require("../model/LocationModel");
const asyncHandler = require('express-async-handler');
const LocationModel = require('../model/LocationModel');
// const Location = require('../model/LocationModel');


const createLocation = asyncHandler(async (req, res) => {

   try {
      const { location_id } = req.body;
      const aLocation = await LocationModel.findOne({ location_id }); // Assuming location_id is the primary key
      if (!aLocation) {
         const newLocation = await LocationModel.create(req.body);
         res.json(newLocation);
      } else {
         throw new Error("Location already exists");
      }

   } catch (error) {
      throw new Error(error);
   }

   
});




const LocationController  = asyncHandler(async(req,res)=>{
   const Locations = await LocationModel.find();
   res.json({
      call:true,
        Locations
     })
});


module.exports = {LocationController,
   createLocation
};