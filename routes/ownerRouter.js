const express =require("express")
const router = express.Router();
const productModel = require("../models/product-model")
const messageModel = require("../models/message")
const CookieParser =require("cookie-parser")
const ownerModel=require("../models/owner-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const orderModel = require("../models/order-model")



router.use(CookieParser());


router.get("/admin",isloggedin,function(req,res){
    res.render("admin")
})


// router.get("/reg",function(req,res){
//   res.render("ownerreg")
// })

router.get("/login",function(req,res){
  res.render("ownerlogin")
})

router.get("/message",isloggedin,async function(req,res){
  let messages = await messageModel.find()
  res.render("message", {messages})
})


router.get("/msgdel/:id",async function(req,res){
  let messages = await messageModel.findOneAndDelete({_id:req.params.id})
  res.redirect("/owner/message")
})

router.get("/order",isloggedin,async function(req,res){
  let orders = await orderModel.find();
  res.render("order",{orders})
})


router.get("/products",isloggedin,async function(req,res){
  let products = await productModel.find()
  res.render("adminproduct.ejs",{products})
})

// router.get("/message",async function(req,res){
//   let products = await productModel.find()
//   res.render("message",{products})
// })



router.get("/delete/:id",async function(req,res){
  let order = await orderModel.findOneAndDelete({_id:req.params.id})
  res.redirect("/owner/admin")
})





//post routesfirstname


// router.post("/create",async function(req,res,next){
//   let{name,username,email,password}=req.body;
//   let owner = await ownerModel.findOne({email})
//   if(owner) res.send("you already have an account kindly login your account")
//       bcrypt.genSalt(10,function(err,salt){
//       bcrypt.hash(password,salt,async function(err,hash){
//          let owner = await ownerModel.create({
//               name,
//               email,
//               username,
//               password:hash
//           })
//           let token = jwt.sign({email,id:owner._id},"owner")
//           res.cookie("token",token)
//           res.redirect("/owner/admin")
          
          
//       })
//       })
  
     
      

// })

router.post("/login",async function(req,res,next){
  let{email,password}=req.body;
  let owner = await ownerModel.findOne({email:email})

  if(!owner)res.send("you dont have any account kindly registered your account")
  bcrypt.compare(password,owner.password,function(err,result){
      if(result){
          let token = jwt.sign({email,id:owner._id},"owner")
          res.cookie("token",token);
          res.redirect("/owner/admin")
      }
          
      
  })
})




router.post("/orders",async function(req,res){
    let{firstname,lastname,email,username,address,address2,country,city,postal,productid,contact,productname,productprice}=req.body;
  let orders = await orderModel.create({
    firstname,
    lastname,
    email,
    contact,
    username,
    address,
    address2,
    country,
    city,
    postal,
    productid,
    productname,
    productprice

  })
  res.redirect("/user/home")  
})

router.post("/message",async function(req,res){

  let{name,email,message}=req.body;

  messageSevice.createmessage();
  let messages = messageModel.create({
    name,
    email,
    message
  })
  res.redirect("/user/contact") 
})



async function isloggedin(req,res,next){
  if(!req.cookies.token){
    res.redirect("/owner/login")
  }else{
    try{
       let decoded = jwt.verify(req.cookies.token,"owner")
       let owner = await ownerModel.findOne({email:decoded.email})
       .select("-password");
       req.owner=owner;
       next();
    } catch(err){
       console.log(err.message)
    } 
   }
};


module.exports=router;