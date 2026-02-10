const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');


const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // OTP expires after 5 minutes
    }
});

// function to send email with otp
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification email from StudyNotion", `Your OTP is ${otp}. It will expire in 5 minutes.`);
        console.log("Verification email sent:", mailResponse);

    } catch (error) {
        console.error("Error sending verification email:", error);
    }
}

OTPSchema.pre('save', async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model('OTP', OTPSchema);