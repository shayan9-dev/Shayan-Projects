const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    
})
module.exports=mongoose.model("owner",ownerSchema)