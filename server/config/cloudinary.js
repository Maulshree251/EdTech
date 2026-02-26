const cloudinary = require('cloudinary');
require('dotenv').config();

exports.cloudinaryConfig = () => {
 try{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    })
 }
    catch(error){
        console.error('Cloudinary configuration failed:', error.message);
        process.exit(1);
    }
    
}