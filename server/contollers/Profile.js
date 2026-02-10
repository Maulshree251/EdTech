const Profile = require("../models/Profile");

//update profile
exports.updateProfile = async (req, res) => {
    try{
        //fetch data 
        const {dateOfBirth="", about="", gender, contactNumber} = req.body;
        //fetch user id
        const userId = req.user.id;
        //validate
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message: "Contact number, gender and user id are required"
            });
        }
        //find profile by user id and update
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const updatedProfile = await Profile.findByIdAndUpdate(profileId, {
            dateOfBirth: dateOfBirth,
            about: about,
            gender: gender,
            contactNumber: contactNumber
        }, {new: true});
        //send response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedProfile
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error updating profile",
            error: err.message
        });
    }
}

//how can we schedule this delete account function to run after 30 days of account deletion request? We can use a job scheduler like node-cron or agenda to schedule the deleteAccount function to run after 30 days of the account deletion request. When a user requests account deletion, we can create a job that will execute the deleteAccount function after 30 days. This way, we can give users a grace period to change their minds before permanently deleting their accounts.
exports.deleteAccount = async (req, res) => {
    try{
        //fetch user id
        const userId = req.user.id;

        //validate
        const userDetails = await User.findById(userId);
        if(!userDetails){
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
        await Course.findOneAndDelete({studentsEnrolled: userId});
        //send response
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error deleting account",
            error: err.message
        });
    }
}

exports.getAllProfiles  = async (req, res) => {
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const ProfileDetail = await Profile.findById(profileId);
        return res.status(200).json({
            success: true,
            message: "Profiles fetched successfully",
            data: ProfileDetail
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error fetching profiles",
            error: err.message
        });
    }
}