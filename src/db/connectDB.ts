import { promises } from "dns";
import mongoose from "mongoose";

const connectDB  = (async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI!);
       console.log(`\n mongoo DB connected !!`);
       
    } catch (error) {
        console.error("mongoo DB connection failed !",error);
        process.exit(1);
    }
})

export default connectDB;