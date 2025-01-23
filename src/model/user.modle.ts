
import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/Iuser.types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema:Schema = new mongoose.Schema<IUser>({
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        default :"update your address"
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    profilePhoto: {
        type: String,  //cloudnary url
        required: true
    },
    admin:{
        type:Boolean,
        default:false
    },
    //advance
    lastLogin:{
        type: Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date
},{timestamps:true})


userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Method to generate an access token
userSchema.methods.generateToken = function (): string {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY!,
        }
    );
};

// // Method to generate a refresh token
// userSchema.methods.generateRefreshToken = function (): string {
//     return jwt.sign(
//         {
//             _id: this._id,
//         },
//         process.env.REFRESH_TOKEN_SECRET!,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY!,
//         }
//     );
// };

export const User = mongoose.model<IUser>("User",userSchema);