//send otp
const OTP = require('../models/OTP');
const User = require('../models/User');
const Profiler = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');


exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        console.log("OTP generated: ", otp);

        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        //create db entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP entry created: ", otpBody);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: otp
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in sending OTP",
            error: err.message
        })
    }
}



//signup
exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            accountType,
            contactNumber
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password and confirm password do not match"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        //find most recent otp stored in db for the email
        const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("Recent OTP: ", recentOTP);

        if (!recentOTP) {
            return res.json({
                success: false,
                message: "OTP not found for the email"
            })
        }

        else if (recentOTP.otp !== otp) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }

        //hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profiler.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })
        const userPayload = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/9.x/adventurer/svg?seed=${firstName}${lastName}`
        }

        const user = await (await User.create(userPayload)).populate("additionalDetails");

        return res.status(200).json({
            success: true,
            message: "account created successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in signing up",
            error: err.message
        })
    }
}

//login
exports.login = async (req, res) => {
    try {
        //fetch details from req
        const { email, password } = req.body;
        // validate
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //check if user exists
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not registered"
            })
        }
        // password matching
        if (await bcrypt.compare(password, user.password)) {
            //generate jwt token
            const payload = {
                email: user.email,
                id: user._id,
                role: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            user.token = token;
            user.password = undefined;

            //create cookie with token
            const options = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('token', token, options).status(200).json({
                success: true,
                message: "Logged in successfully",
                token: token,
                user: user
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials. Password does not match"
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in logging in",
            error: err.message
        })
    }
}

//password change

exports.changePassword = async (req, res) => {
    try {
        //get data from request body
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const userId = req.user.id;

        //validate data
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm new password do not match"
            })
        }

        //find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //compare old password
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            })
        }

        //update password in db after hashing
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

        //send email notification to user for password reset
        try {
            await mailSender(user.email, "Password Changed", "Your password has been changed successfully. If you did not initiate this change, please contact support immediately.")
        } catch (error) {
            console.error("Error sending mail:", error);
        }

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in changing password",
            error: err.message
        })
    }
}

//reset password with otp
