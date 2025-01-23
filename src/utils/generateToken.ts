import jwt from "jsonwebtoken";
import { IUser } from "../types/Iuser.types";
import { Response } from "express";

const generateToken = async (res:Response,user:IUser)=>{

    const token = jwt.sign(
        {
            userId:user._id
        },
        process.env.TOKEN_SECRET!,
        {
            expiresIn:process.env.TOKEN_EXPIRY!,
        });
        res.cookie("token",token,
        {
            httpOnly: true, 
            sameSite: 'strict', 
            maxAge: 24 * 60 * 60 * 1000 
        });

        return token;
}

export { generateToken }
