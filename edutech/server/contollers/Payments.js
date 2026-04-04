const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const { instance } = require("../config/Razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");


exports.capturePayment = async (req, res) => {
    try {
        //fetch userId and courseId
        const { courseId } = req.body;
        const userId = req.user.id;
        //validate
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course id is required"
            });
        }

        //fetch course details 
        const courseDetails = await Course.findById(courseId);
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Could not find the course."
            })
        }

        //check if user has already paid for the course
        const uid = new mongoose.Types.ObjectId(userId);
        if (courseDetails.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: "Student is already enrolled"
            })
        }

        //order create 
        const amount = courseDetails.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: courseId,
                userId
            }
        };

        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        //return response
        return res.status(200).json({
            success: true,
            courseName: courseDetails.courseName,
            courseDescription: courseDetails.description,
            orderId: paymentResponse.id,
            amount: paymentResponse.amount,
            currency: paymentResponse.currency,
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error in payment capture",
            error: err.message
        })
    }
}

//verify signature of razorpay and server
exports.verifySignature = async (req, res) => {

    try {
        const webhookSecret = "12345678";
        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest("hex");

        if (signature === digest) {
            console.log("Payment is authorized");
            const { courseId, userId } = req.body.payload.payment.entity.notes;

            try {
                //fullfil the action
                //find course and add user to the course
                const enrolledCourse = await Course.findOneAndUpdate({ _id: courseId }, { $push: { studentsEnrolled: userId } }, { new: true });
                //find user and add course in user 
                const enrolledStudent = await User.findOneAndUpdate({ _id: userId }, { $push: { courses: courseId } }, { new: true });
                console.log("enrolledCourse:", enrolledCourse, "enrolledStudent: ", enrolledStudent);

                //send mail
                const mailResponse = await mailSender(enrolledStudent.email,
                    "Congrats from CodeHelp",
                    "you are enrolled into new codehelp course"
                );

                return res.status(200).json({
                    success: true,
                    message: "Signature verified and course added"
                })
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error in signature verification or course enrollment"
                })
            }
        }

        return res.status(400).json({
            success: false,
            message: "Invalid signature. Payment not authorized."
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error in authorizing payment.",
            error: err.message
        });
    }
}
