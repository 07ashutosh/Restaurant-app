import { ApiError } from "../utils/ApiError";
// import { ApiResponse } from "../utils/ApiResponce";
import { asyncHandler } from "../utils/asyncHandeler";
// import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express{
        interface Request{
            id:String;
        }
    }
}

const isAuthenticated = asyncHandler(async (req,_,next)=>{
    const { token } = req.cookies.token;

    if(!token){
        throw new ApiError(401,"user not authenticated")
    }
    // verify token

    const decode = jwt.verify(token,process.env.SECRET_KEY!) as JwtPayload;

    // check if decoding is successfull 

    if(!decode){
       throw new ApiError(401,"invalid token") 
    }

    req.id = decode.userId;
    next();
})


export { isAuthenticated }