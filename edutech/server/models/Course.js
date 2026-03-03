const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
    }],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String
    },
    tag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags"
    }],
    Category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    instructions: {
        type: [String]
    },
    status: {
        type: String,
        enum: ["Draft", "Published"]
    }
});

module.exports = mongoose.model('Course', CourseSchema);