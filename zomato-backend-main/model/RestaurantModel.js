const mongoose  = require("mongoose");

//create schema
const Schema  = new mongoose.Schema(
    {
      
        name: {type:String},
        city:  {type:String},
        location_id:{type:Number},
        city_id: {type:Number},
        locality:  {type:String},
        thumb: {type:Array},
        aggregate_rating: {type:Number},
        rating_text:  {type:String},
        min_price:{type:Number},
        contact_number:  {type:String},
        cuisine_id: {type:Array},
        cuisine:{type:Array},
        image:  {type:String},
        collection_id:{type:Number}

  }
)

//create model
const RestaurantModel =  mongoose.model("restaurant",Schema,"restaurants");  // name , schema , collection name
module.exports = RestaurantModel;