const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');
const Tags = require('../models/Tags');
const User = require('../models/User');
const {uploadImgToCloudinary} = require('../utils/imageUploader');
const cloudinary = require('cloudinary');

exports.createCourse = async (req, res) => {
    try{
        // Log request data for debugging
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);

        // Fetch data from request body
        let {courseName, description, whatYouWillLearn, price, tag} = req.body || {};
        
        // Parse tag if it's a JSON string
        if(typeof tag === 'string') {
            try {
                tag = JSON.parse(tag);
            } catch(e) {
                tag = [tag];
            }
        }
        
        // Ensure tag is an array
        if(!Array.isArray(tag)) {
            tag = [tag];
        }
        
        // Fetch thumbnail from files
        const thumbnail = req.files?.thumbnail;
        console.log(thumbnail)
        // Validation with detailed error messages
        if(!courseName){
            return res.status(400).json({
                success: false,
                message: "Course name is required"
            });
        }
        if(!description){
            return res.status(400).json({
                success: false,
                message: "Description is required"
            });
        }
        if(!whatYouWillLearn){
            return res.status(400).json({
                success: false,
                message: "What you will learn is required"
            });
        }
        if(!price){
            return res.status(400).json({
                success: false,
                message: "Price is required"
            });
        }
        if(!tag || tag.length === 0){
            return res.status(400).json({
                success: false,
                message: "Tag is required"
            });
        }
        if(!thumbnail){
            return res.status(400).json({
                success: false,
                message: "Thumbnail image is required. Make sure to send the file with field name 'thumbnail' as multipart/form-data",
                receivedFiles: req.files ? Object.keys(req.files) : "No files received"
            });
        }
        //check for instructor 
        const instructorDetails = await User.findById(req.user.id);
        console.log(instructorDetails);

        if(!instructorDetails || instructorDetails.accountType !== "Instructor"){
            return res.status(403).json({
                success: false,
                message: "Only instructors are allowed to create courses"
            })
        }
        // Validate all tags exist
        const tagDetails = await Tags.find({_id: {$in: tag}});
        if(tagDetails.length !== tag.length){
            return res.status(404).json({
                success: false,
                message: "One or more tags not found"
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
            tag: tag,
            thumbnail: thumbnailUrl.secure_url
        })

        //add new course to instructor's course list
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {$push: {courses: newCourse._id}},
            {new: true}
        )

        //add new course to all tags' course list
        await Tags.updateMany(
            {_id: {$in: tag}},
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

//get course details
exports.getCourseDetails = async(req,res) => {
    try{
        const {courseId} = req.params;
        console.log(courseId)
        const courseDetails = await Course.find({_id: courseId})
                                                .populate({
                                                    path: "instructor",
                                                    populate:{
                                                        path: "additionalDetails"
                                                    }
                                                })
                                                .populate("Category")
                                                .populate("ratingAndReviews")
                                                .populate({
                                                    path: "courseContent",
                                                    populate: {
                                                        path: "SubSection"
                                                    }
                                                }).exec();
        //validation
        if(!courseDetails){
            return res.status(500).json({
                success: false,
                message: `Could not find the course with course id: ${courseId}` 
            })
        }

        return res.status(200).json({
            success: true,
            message: "Cours details fetched successfully",
            data: courseDetails
        })
    } catch(err) {
        console.log(err);
        return res.json({
            success: false,
            message: "error in fetching course details"
        })
    }
}

exports.editCourse = async (req, res) => {
    //fetch course id from req body
    //validate the course id
    //fetch course details from db
    //fetch instructor id from course details
    //validate if the instructor id and the user id match 
    //fetch data from req body
    //update only provided fields
    //check if thumbnail is provided
    //if provided update thumbnail in db
    //upload thumbnail in cloudinary
    //delete previous thumbnail from cloudinary
    //return res
    const {courseId} = req.body;

    if(!courseId) {
        return res.status(400).json({
            success: false,
            message: "Course does not exist"
        })
    }

    const course = await Course.findById(courseId);
    const instructorId = course.instructor.toString();
    console.log("instructor id:",instructorId)
    console.log("user id:", req.user.id)
    if(instructorId !== req.user.id){
        return res.status(403).json({
            success: false,
            message: "only the instructor who created course can edit it"
        })
    }

    let {courseName, description, price, tag, whatYouWillLearn} = req.body;

    if(!courseName || !description || !price || !tag || !whatYouWillLearn){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    if(typeof tag === 'string') {
            try {
                tag = JSON.parse(tag);
            } catch(e) {
                tag = [tag];
            }
        }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, 
        {courseName: courseName, description: description, price: price, tag: tag, whatYouWillLearn: whatYouWillLearn},
        {new: true}
    )

    if(req.files.thumbnail){
        const uploadResponse = await uploadImgToCloudinary(thumbnail, process.env.FOLDER_NAME);

        if(course.thumbnail){
            try{
                const publicId = course.thumbnail.split('/').pop().split('.')[0];
                await cloudinary.upoader.destroy(publicId); 
            } catch(err){
                return res.status(400).json({
                    success: flase,
                    message: "Error deleting old thumbnail from cloudinary"
                });
            }
        }
        const updatedThumbnail = await Course.findByIdAndUpdate(courseId, {thumbnail: thumbnail.name}, {new: true});

    }
    return res.status(200).json({
        success: true,
        message: "Course edited successfully"
    })

}

exports.deleteCourse = async(req, res) => {
    try{
        //fetch course id from req.params
    const {courseId} = req.body;
    const userId = req.user.id;
    
    //find the course 
    const course = await Course.findById(courseId);
    //validate
    if(!course){
        return res.status(400).json({
            success: false,
            message: "Course doesnot exist"
        })
    }

    //check if user is instructor that created the course
    const instructorId = course.instructor.toString();
    if(instructorId !== userId){
        return res.json(400).json({
            success: true,
            message: "only instructor who has created the course can delete it"
        })
    }

    //unenroll all students enrolled in this course
    await User.updateMany(
        {_id: {$in: course.studentsEnrolled}},
        {$pull: {courses: courseId}}
    );

    //delete all rating nd reviews from this course 
    await RatingAndReview.deleteMany(
        {_id: {$in: course.ratingAndReviews}}

    )

    //delete the course from the instructors course list
    await User.findByIdAndUpdate(userId, {$pull: {courses: courseId}}
    )

    //delete the course itself
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    //send response 
    return res.status(200).json({
        success: true,
        message: "course deleted successfully"
    })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "error in deleting course",
            error: err.message
        })
    }
}