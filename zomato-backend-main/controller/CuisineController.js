const CuisineModel = require("../model/CuisineModel");
const asyncHandler = require("express-async-handler");

const createCuisine = asyncHandler(async(req,res)=>{
  try {
     const {cuisine_id} = req.body;
     const a_cuisine = await CuisineModel.findOne({cuisine_id});
     if(!a_cuisine)
        {
           const new_cuisine = await CuisineModel.create(req.body);
           res.json(new_cuisine);
        }
        else
        {
           throw new Error("Meal with the same cuisine_id already exists");
        }
  } catch (error) {
     throw new Error(error);
  };
  
});
const CuisineController  = {
   
    getCuisineList:async(request,response)=>{
    //   let {rest_id} = request.params;
       let result = await CuisineModel.find({});
       response.send({
        call:true,
         result
       })
 
     },
    }


module.exports = {CuisineController,
  createCuisine};