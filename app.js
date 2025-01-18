import express from "express";
import http from "http"
import multer from "multer";
import path from "path";
import db from "./config/mongoose-connection.js";
import usersRouter from "./routes/userRouter.js";
import productsRouter from "./routes/productRouter.js";
import ownersRouter from "./routes/ownerRouter.js";
import index from "./routes/index.js";
import upload from "./config/multer-config.js";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 2000;

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))


app.use("/",index)
app.use("/user",usersRouter)
app.use("/owner",ownersRouter)
app.use("/product",productsRouter)




server.listen(port, (req,res) => {
    console.log(`Server is running on http://localhost:${port}`)    
});