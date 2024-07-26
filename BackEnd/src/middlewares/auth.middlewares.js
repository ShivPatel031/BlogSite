import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const varifyJWT = asynchandler(async (req,res,next)=>
    {
        try {

            if(!req.cookies.accessToken){ res.status(200).json("don't have user cookies");}
            else
            {
            const token = JSON.parse(req.cookies?.accessToken) || req.header("Authorization")?.replace("Bearer ","");

            if(!token) throw new ApiError(401,"Unauthorized request");

            const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

            if(!decodedToken) throw new ApiError(401,"Token decode is failed");
            
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

            if(!user) throw new ApiError(401,"Invalid access token");

            req.user=user;

            next();
        }
            
        } catch (error) {
            throw new ApiError(400,error?.message || "Invalid access token");
        }
    }
)