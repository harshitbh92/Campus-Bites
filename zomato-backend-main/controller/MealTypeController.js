const MealTypeModel = require("../model/MealTypeModel");
const asyncHandler = require("express-async-handler");


// const getAllMeal = asyncHandler(async(req,res)=>{
//    try {
//      const allmeal = await RestaurantModel.find();
//      res.json(allmeal);
//    } catch (error) {
//      throw new Error(error);
//    }
//  })
const createMeal = asyncHandler(async(req,res)=>{
   try {
      const {meal_type} = req.body;
      const a_meal = await MealTypeModel.findOne({meal_type});
      if(!a_meal)
         {
            const new_meal = await MealTypeModel.create(req.body);
            res.json(new_meal);
         }
         else
         {
            throw new Error("Meal with the same meal_type already exists");
         }
   } catch (error) {
      throw new Error(error);
   };
   
});
const MealTypeController  = {
    getMealTypeList : async(request,response)=>{
       let result = await MealTypeModel.find();
       response.send({
        call:true,
          result
       })
    }
}


module.exports = {createMeal ,
   
   MealTypeController};