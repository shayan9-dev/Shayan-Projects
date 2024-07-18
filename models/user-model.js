const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    orders:{
        type:Array,
        default:[]
    }
})
module.exports=mongoose.model("user",userSchema)