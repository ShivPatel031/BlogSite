import {v2 as cloudinary} from "cloudinary";
import fs from 'fs'

cloudinary.config(
    {
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET
    }
)

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return  null
        const respones = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type:"auto"
            }
        )

        fs.unlinkSync(localFilePath);

        return respones; 

    }catch(error){

        fs.unlinkSync(localFilePath);
        return null;
    }
}
const removePostCloudinary=async (public_id)=>{
    
    return await cloudinary.uploader.destroy(public_id)
}

export {uploadOnCloudinary,removePostCloudinary};
