import {v2 as cloudinary} from 'cloudinary';
import { CLOUDINARY_API_KEY,CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_SECRET } from '../config/index.js';     
import fs from "fs"



cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async function(localFilePath){
  try {
    if(!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type: "auto"
    })
    //file hasbeen uploaded successfully
    //console.log("file is uploaded on cloudinary", response.url)
    fs.unlinkSync(localFilePath)
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath)//  remove file locally save temporary file as the operation got faild
  }
}


export {uploadOnCloudinary}


// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });







