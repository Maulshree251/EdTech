const Subsection = require("../models/Subsection");
const Section = require("../models/Section");
const { uploadImgToCloudinary } = require("../utils/imageUploader");

//create a subsection
exports.createSubsection = async (req, res) => {
    try{
        //fetch data from req body
        const {sectionId, title, timeDuration, description} = req.body;
        //fetch file video from req
        const videoFile = req.files.videoFile;
        //validate
        if(!sectionId || !title || !videoFile || !timeDuration) {
            return res.status(400).json({
                success: false,
                message: "Section ID, title, video file and time duration are required"
            });
        }

        //upload video to cloudinary and get secure url 
        const uploadResult = await uploadImgToCloudinary(videoFile, process.env.FOLDER_NAME);
        //create new subsection entry in db
        const newSubsection = await Subsection.create({
            title: title,
            timeDuration: timeDuration,
            videoURL: uploadResult.secure_url,
            description: description 
        });
        //update section  with new subsection id
        const updatedSection =await Section.findByIdAndUpdate(sectionId, {
            $push: {subSections: newSubsection._id}
        }, {new: true} ).populate("subSections").exec();

        console.log("Updated Section with new Subsection:", updatedSection);
        //send response
        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            data: newSubsection
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error creating subsection",
            error: err.message
        });
    }
}

//update subsection
exports.updateSubsection = async (req, res) => {
    try{
        //fetch data from req body
        const {title, timeDuration, description} = req.body;
        const videoFile = req.files.videoFile;
        //fetch subsection id from req params
        const {subsectionId} = req.params;
        //validate
        if(!title && !timeDuration && !description && !videoFile){
            return res.status(400).json({
                success: false,
                message: "At least one field (title, time duration, description or video file) is required for update"
            });
        }
        //if video file is present in req, upload to cloudinary and get secure url
        const updatedVideo = await uploadImgToCloudinary(videoFile, process.env.FOLDER_NAME);
        //update subsection entry in db with new data
        const updatedSubsection = await Subsection.findByIdAndUpdate(subsectionId, {
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoURL: updatedVideo.secure_url 
        }, {new: true})
        //send response
        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            data: updatedSubsection
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error updating subsection",
            error: err.message
        });
    }
}

//delete subsection
exports.deleteSubsection = async (req, res) => {
    try{
        //fetch subsection id from req params
        const {subsectionId} = req.params;
        //delete subsection entry from db
        const deletedSubsection = await Subsection.findByIdAndDelete(subsectionId);
        if(!deletedSubsection){
            return res.status(404).json({
                success: false,
                message: "Subsection not found"
            });
        }
        //send response
        return res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
            data: deletedSubsection
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Error deleting subsection",
            error: err.message
        });
    }
}