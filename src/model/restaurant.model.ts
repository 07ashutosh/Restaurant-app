import mongoose from "mongoose";
import { IRestaurant } from "../types/Irestaurant.types";

const restaurantSchema = new mongoose.Schema<IRestaurant>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    restaurantname:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    deliveryTime:{
        type:Number,
        required:true
    },
    cuisines:[{
        type:String,
        required:true
    }],
    imageUrl:{
        type:String,
        required:true
    },
    menu:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Menu"
    }]

},{timestamps:true})

export const Restaurant = mongoose.model<IRestaurant>("Restaurant",restaurantSchema);