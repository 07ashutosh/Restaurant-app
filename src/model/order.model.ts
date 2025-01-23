import mongoose from "mongoose";
import { IOrder } from "../types/Iorder.types";

const orderSchema = new mongoose.Schema<IOrder>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true

    },
    deliveryDetails:{
        email:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        }
    },
    cartItem:[
        {
        menuId:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },

    }
],
    totalAmount:{
        type:Number,
        required:true
    },
    status:{
      type:String,
      enum:["pending" , "delivered" , "confirmed" , "preparing" , "OutForDelivery"]  
    }
},{timestamps:true})

export const Order = mongoose.model<IOrder>("Order",orderSchema);