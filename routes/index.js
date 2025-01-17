const express =require("express")
const router = express.Router();




router.get("/login",function(req,res,next){
    res.render("login")
})
router.put("/login/logout",function(req,res){
    res.send("everything is workiing and good")
})

router.get("/reg",function(req,res,next){
    res.render("Register")
})
router.get("/",function(req,res){
    res.redirect("/user/home")
})

router.get("/owner",function(req,res){
    res.redirect("/owner/admin")
})

module.exports=router;