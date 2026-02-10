const Course = require('../models/Course');
const Tags = require('../models/Tags');
const User = require('../models/User');
const {uploadImgToCloudinary} = require('../utils/imageUploader');

exports.createCourse = async (req, res) => {
    try{
        //fetch data
        const {courseName, description, whatYouWillLearn, price, tag} = req.body;
        
        const thumbnail = req.files.thumbnail;

        //validation
        if(!courseName || !description || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //check for instructor 
        const instructorDetails = await User.findById(req.user.id);
        console.log(instructorDetails);

        if(!instructorDetails || instructorDetails.role !== "Instructor"){
            return res.status(403).json({
                success: false,
                message: "Only instructors are allowed to create courses"
            })
        }
        const tagDetails = await Tags.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success: false,
                message: "Tag not found"
            })
        }

        //upload image to cloudinary
        const thumbnailUrl = await uploadImgToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course in db
        const newCourse = await Course.create({
            courseName,
            description,
            whatYouWillLearn,
            price,
            instructor: instructorDetails._id,
            tag: tagDetails._id,
            thumbnail: thumbnailUrl.secure_url
        })

        //add new course to instructor's course list
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {$push: {courses: newCourse._id}},
            {new: true}
        )

        //add new course to tag's course list
        await Tags.findByIdAndUpdate(
            {_id: tagDetails._id},
            {$push: {courses: newCourse._id}},
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        })

    } catch(err){
            return res.status(500).json({
                success: false,
                message: "Error in creating course",
                error: err.message
            })
    }
}

exports.getAllCourses = async (req, res) => {
    try{
        const allCourses = await Course.find({}, {courseName:true, price: true});

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: allCourses
        })
    } catch(err){
        return res.status(400).json({
            success: true,
            message: "Error in fetching courses.",
            error: err.message
        })
    }
}