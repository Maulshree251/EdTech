const cloudinary = require('cloudinary').v2;

exports.uploadVideoToCloudinary = async (file, folder) => {
    try {
        const options = {
            folder: folder,
            resource_type: "video",
        };

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (err) {
        console.log("Error in uploading video to cloudinary: ", err);
        throw err;
    }
}
