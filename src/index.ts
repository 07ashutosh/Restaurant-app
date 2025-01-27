import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyparser, { json } from "body-parser";
import userRouter from "./routes/user.routes";
import restaurantRoute from "./routes/restaurant.routes";
import menuRouter from "./routes/menu.routes";
dotenv.config({path:"./.env"})

const port: any = process.env.PORT || 5000;

//default middleware for every mern project
app.use(bodyparser.json({limit:'10kb'}));
app.use(express.urlencoded({extended:true, limit:'10kb'}));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
    origin:process.env.CORS,
    credentials:true
}
app.use(cors(corsOption));


app.use("/api/v1/user",userRouter);
//http://localhost:5000/api/v1/user/signup

app.use("/api/v1/restaurant",restaurantRoute);
//http://localhost:5000/api/v1/restaurant/

app.use("/api/v1/menu",menuRouter);
//http://localhost:5000/api/v1/menu/

connectDB()
.then(()=>{
    app.listen(port , ()=>{
    
        console.log(`process is running on port ${port}`);
    })
})
.catch((err)=>{
    console.log("DB connection failed !",err);
    
})

