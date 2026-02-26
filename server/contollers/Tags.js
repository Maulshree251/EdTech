const Tags = require('../models/Tags');

exports.createTag = async(req, res) =>{
    try{
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "Name and description are required"
            })
        }
        const tagDetails = await Tags.create({
            name: name,
            description: description
        })
        return res.status(200).json({
            success: true,
            message: "Tag created successfully",
            data: tagDetails
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in creating tag",
            error: err.message
        })
    }
}

exports.getAllTags = async(req, res) => {
    try{
        const allTags = await Tags.find({}, {name: true, description: true});
        return res.status(200).json({
            success: true,
            message: "Tags fetched successfully",
            data: allTags
        })
    }
    
     catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in fetching tags",
            error: err.message
        })
     }
    
}