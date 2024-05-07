const mongoose  = require("mongoose");

//create schema
const Schema  = new mongoose.Schema(
    {
    fullname:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String},
    address:{type:String}

  }
)

//create model
const UserModel =  mongoose.model("user",Schema,"users");  // name , schema , collection name
module.exports = UserModel;