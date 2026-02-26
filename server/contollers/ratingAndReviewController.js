const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//create rating

exports.createRating = async (req, res) => {
    //get user id
    const userId = req.user.id;
    //fetch data from req body
    const {rating, review, courseId} = req.body
    //check id user is enrolled or not
    const courseDetails = await Course.findOne({_id: courseId,
                                                studentsEnrolled: {$elemMatch: {$eq: userId} }
    });
    if(!courseDetails){
        return res.status(404).json({
            success: false,
            message: "student is not enrolled in this course"
        })
    }
    //check if user haas already reviewed
    const alreadyReviewed = await RatingAndReview.findOne({user: userId, course: courseId});

    if(alreadyReviewed){
        return res.status(403).json({
            success: false,
            message: "User has already reviewed the course"
        })
    }
    //create rating review
    const ratingReview = await RatingAndReview.create({rating, review, course: courseId, user: userId}); 

    //update course with new rating in db
    const updatedCourse = await Course.findByIdAndUpdate({_id: courseId}, {$push: {ratingAndReviews: ratingReview._id}}, {new: true});

    return res.status(200).json({
        success: true,
        message: "rating and review successfully"
    })
    //return response 
}

//getAverage rating
exports.getaverageRating = async (req, res) => {
    //get courseId
    try{
        const courseId = req.body.courseId;
    const result = await RatingAndReview.aggregate(
        {
            $match: {course: new mongoose.Types.objectId(courseId)}
        },
        {
            $group: {
                _id: null,
                averageRating: {$avg: "$rating"}
            }
        }
    )

    if(result.length > 0){
        return res.status(200).json({
            success: true,
            averageRating: result[0].averageRating
        })
    }

    return res.status(200).json({
        success: true,
        message: "no rating and reviews available",
        averageRating: 0
    })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "error in calculating average rating"
        })
    }
    

}

//get all rating
exports.getAllRating = async (req, res) => {
    try{
        const allRating = (await RatingAndReview.find({})).sort({rating: "desc"}).populate({path: "user", select: "firstName, lastName, email, image"})
                                            .populate({path: "course", select: "courseName"}).exec();

    return res.status(200).json({
        success: true,
        message: "rating and reviews fetched successfully",
        rating: allRating
    });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "error in fetching all reating"
        })
    }
    

}

