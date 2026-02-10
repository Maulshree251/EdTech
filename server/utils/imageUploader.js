const cloudinary = require('cloudinary').v2;
require('dotenv').config();



exports.uploadImgToCloudinary = async (file, folder, height, quality) => {
    try{
        const options = {folder: folder};
        if(height){
            options.height = height;
        }
        if(quality) options.quality = quality;
        options.resource_type = "auto";
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;

    } catch(err){
        console.log("Error in uploading image to cloudinary: ", err);
        throw err;
    }
}
