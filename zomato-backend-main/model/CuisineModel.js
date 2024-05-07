const mongoose  =require("mongoose");

const CuisineSchema = new mongoose.Schema({
    cuisine_id:{
        type:Number
    },
    name:{
        type:String
    }
})


const  CuisineModel =  mongoose.model("cuisine",CuisineSchema);
module.exports = CuisineModel;