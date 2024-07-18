const express =require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const CookieParser =require("cookie-parser")
const bcrypt = require("bcrypt");
const userModel=require("../models/user-model")
const productModel = require("../models/product-model")

router.use(CookieParser());


//protector routes
router.get("/home",isloggedin,async function(req,res){
    let products = await productModel.find()
    res.render("home",{products})
})


router.get("/products",isloggedin,async function(req,res,next){
  let products = await productModel.find()
    res.render("Product",{products})
})


router.get("/contact",isloggedin,function(req,res,next){
    res.render("contact")
})

router.get("/checkout/:id",isloggedin,async function(req,res,next){
    let product = await productModel.findOne({_id:req.params.id})
    
    res.render("checkout",{product})
})

router.get("/checkout",isloggedin,async function(req,res,next){
    
    res.redirect("/user/checkout")
})


router.get("/view/:id",isloggedin,async function(req,res,next){
    let product = await productModel.findOne({_id:req.params.id})
    res.render("dash",{product})
})


router.get("/cart/:id",isloggedin,async function(req,res,next){
    let user = await userModel.findOne({email:req.user.email})
     user.cart.push(req.params.id)
    await user.save();
    res.redirect("/user/products")
})

router.get("/cart",isloggedin,async function(req,res,next){
    let user = await userModel.findOne({email:req.user.email}).populate("cart");
    res.render("cart",{user})
})





router.get("/cart/remove/:id",isloggedin,async function(req,res,next){
    let user = await userModel.findOne({email:req.user.email})
     user.cart.splice((req.params.id),1)
    await user.save();
    res.redirect("/user/cart")
})


//post routes


router.post("/create",async function(req,res,next){
    let{name,username,email,password}=req.body;
    let user = await userModel.findOne({email})
    if(user) res.send("you already have an account kindly login your account")
        bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
           let user = await userModel.create({
                name,
                email,
                username,
                password:hash
            })
            let token = jwt.sign({email,id:user._id},"shayan")
            res.cookie("token",token)
            res.redirect("/user/home")
        })
        }) 

})


router.post("/login",async function(req,res,next){
    let{email,password}=req.body;
    let user = await userModel.findOne({email:email})

    if(!user)res.send("you dont have any account kindly registered your account")
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = jwt.sign({email,id:user._id},"shayan")
            res.cookie("token",token);
            res.redirect("/user/home")
        }
            
        
    })
})




router.get("/logout",(req ,res)=>{
    res.cookie("token","")
    res.redirect("/login");
})



async function isloggedin(req,res,next){
   if(!req.cookies.token){
     res.redirect("/login")
   }else{
     try{
        let decoded = jwt.verify(req.cookies.token,"shayan")
        let user = await userModel.findOne({email:decoded.email})
        .select("-password");
        req.user=user;
        next();
     } catch(err){
        console.log(err.message)
     } 
    }
};



module.exports=router;
