const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");

exports.generateToken = async (req, res) => {
    try{
        const {email} = req.body;
        console.log(email);
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const token = await crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({email: email}, {token: token, resetPasswordExpires: Date.now() + 5*60*1000}, {new: true})

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email, "Password Reset Link", `Click on the link to reset your password: ${url}`);

        return res.json({
            success: true,
            message: "Password reset link sent to your email",
            user: updatedDetails
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in generating token",
            error: err.message
        })
    }
}

//reset password

exports.resetPassword = async(req, res) => {
    try{
        const {password, confirmPassword, token} = req.body;

        //validate
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match"
            })
        }
        //find user with token and check if token is not expired
        const user = await User.findOne({token: token, resetPasswordExpires: {$gt: Date.now()}});
        if(!user){
            return res.json({
                success: false,
                message: "Invalid token or token has expired"
            })
        }
        //hash password and update in db
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({token: token}, {password: hashedPassword}, {new: true});
        return res.json({
            success: true,
            message: "Password reset successful"
        })


    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in resetPassword",
            error: err.message
        })
    }
};