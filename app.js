const express = require ("express");
const app = express();
const multer = require("multer")
const path = require("path");
const db = require("./config/mongoose-connection")
const usersRouter = require("./routes/userRouter")
const productsRouter = require("./routes/productRouter")
const ownersRouter = require("./routes/ownerRouter")
const index = require("./routes/index")
const upload = require("./config/multer-config")



app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))


app.use("/",index)
app.use("/user",usersRouter)
app.use("/owner",ownersRouter)
app.use("/product",productsRouter)




app.listen(3000);