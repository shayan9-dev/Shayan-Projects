const express =require("express")
const router = express.Router();
const productModel = require("../models/product-model")
const upload = require("../config/multer-config")


router.get("/",function(req,res){
    res.send("hey")
})

router.get("/productdel/:id",async function(req,res){
    let product = await productModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/owner/products")
})




//post routes

router.post("/create",upload.single("image"),async function(req,res){
    let{name,price,desc,image}=req.body;
    let product = await productModel.create({
        name,
        image:req.file.buffer,
        desc,
        price

    })
    res.redirect("/owner/admin")
})


module.exports=router;