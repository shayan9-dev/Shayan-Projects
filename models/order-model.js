const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    contact:Number,
    address:String,
    address2:String,
    country:String,
    city:String,
    postal:Number,
    productid:String,
    productname:String,
    productprice:String
    
})
module.exports=mongoose.model("order",orderSchema)