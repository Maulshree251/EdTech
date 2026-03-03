const Section = require("../models/Section");
const Course = require("../models/Course");

//create a section
exports.createSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;

        //validate
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,                
                message: "Section name and course ID are required"
            })
        }

        //check if course exists in db
        const course = await Course.findById(courseId)
        if(!course) {
            return res.status(400).json({
                success: false,
                message: "Course does not exist"
            })
        }
        //create section
        const newSection = await Section.create({sectionName: sectionName, courseId:courseId});
        //update course with section
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push: {courseContent: newSection._id}
        }, {new: true}).populate("courseContent").exec();
        if(!updatedCourse) {
            return res.json({
                success: false,
                message: "Course content not added to course"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Section created and added to course successfully",
            section: newSection,
            course: updatedCourse
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error creating section",
            error: err.message
        })
    }
}

//update section
exports.updateSection = async (req, res) => {
    try{
        const {sectionId} = req.body;
        const {sectionName} = req.body;
        if(!sectionName){
            return res.status(400).json({
                success: false,
                message: "Section name is required for update"
            });
        }
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});
        if(!updatedSection){
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            section: updatedSection
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error updating section",
            error: err.message
        })
    }
}
//delete section
exports.deleteSection = async (req, res) => {
    try{
        const {sectionId} = req.body;

        await Section.findByIdAndDelete(sectionId);
        await Course.deleteOne({courseContent: sectionId});
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        });   
    } catch(err){
        return res.statur(500).json({
            success: false,
            message: "Error deleting section",
            error: err.message
        })
    }
}