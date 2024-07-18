const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    image:Buffer
    
   
})
module.exports=mongoose.model("product",productSchema)