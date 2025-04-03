import { v2 as cloudinary } from "cloudinary";
import { logger } from "./logger.js";

export const connectCoudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
};

export const uploadImage = async (file) => {
  const options = { folder: "Blog Site Posts" };
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.path, options);
};

export const removePostCloudinary=async (public_id)=>{
    
    return await cloudinary.uploader.destroy(public_id)
}