import mongoose from "mongoose";
import { IMenu } from "../types/Imenu.types";

const menuSchema = new mongoose.Schema<IMenu>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
},{timestamps:true})

export const Menu = mongoose.model<IMenu>("Menu",menuSchema);