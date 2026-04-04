const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImgToCloudinary } = require("../utils/imageUploader");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

//update profile
exports.updateProfile = async (req, res) => {
    try {
        console.log("update profile route hit")
        //fetch data 
        const { dateOfBirth = "", about = "", gender, contactNumber, firstName, lastName } = req.body;
        //fetch user id
        const userId = req.user.id;
        //validate
        if (!contactNumber || !gender || !userId) {
            return res.status(400).json({
                success: false,
                message: "Contact number, gender and user id are required"
            });
        }
        console.log("Validation done")

        // Update User model data (Display Name)
        if (firstName !== undefined || lastName !== undefined) {
             const updateObj = {};
             if (firstName !== undefined) updateObj.firstName = firstName;
             if (lastName !== undefined) updateObj.lastName = lastName;
             console.log("UpdateObj for User:", updateObj);
             await User.findByIdAndUpdate(userId, updateObj, { new: true });
        }

        //find profile by user id and update
        const userDetails = await User.findById(userId);
        console.log("UserDetails after update array:", userDetails);
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndUpdate(profileId, {
            dateOfBirth: dateOfBirth,
            about: about,
            gender: gender,
            contactNumber: contactNumber
        }, { new: true });
        console.log("Profile updated")

        // Fetch the updated user with populated additionalDetails
        const updatedUser = await User.findById(userId).populate("additionalDetails");

        //send response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedProfile: updatedUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating profile",
            error: err.message
        });
    }
}


//how can we schedule this delete account function to run after 30 days of account deletion request? We can use a job scheduler like node-cron or agenda to schedule the deleteAccount function to run after 30 days of the account deletion request. When a user requests account deletion, we can create a job that will execute the deleteAccount function after 30 days. This way, we can give users a grace period to change their minds before permanently deleting their accounts.
exports.deleteAccount = async (req, res) => {
    try {
        //fetch user id
        const userId = req.user.id;

        //validate
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        //delete user profile
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId);

        //now delete user 
        await User.findByIdAndDelete(userId);
        await Course.findOneAndDelete({ studentsEnrolled: userId });
        //send response
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting account",
            error: err.message
        });
    }
}

exports.getAllProfiles = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate("additionalDetails");
        const profileId = userDetails.additionalDetails;
        const ProfileDetail = await Profile.findById(profileId);
        return res.status(200).json({
            success: true,
            message: "Profiles fetched successfully",
            ProfileData: ProfileDetail,
            UserDetails: userDetails
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching profiles",
            error: err.message
        });
    }
}

exports.updateProfilePicture = async (req, res) => {
    try {
        //fetch profile picture url
        console.log("displayPicture", req.files);
        const imageFile = req.files.displayPicture;

        //upload image to cloudinary
        const uploadResult = await uploadImgToCloudinary(imageFile, process.env.FOLDER_NAME);
        console.log(uploadResult)

        // Fetch user id 
        const userId = req.user.id;
        console.log(userId)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Delete old image from cloudinary if it exists
        if (user.image) {
            try {
                const publicId = user.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.log("Error deleting old image:", err.message);
            }
        }
        //
        // Update user model with new image url
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: uploadResult.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: updatedUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating profile picture",
            error: err.message
        });
    }
}