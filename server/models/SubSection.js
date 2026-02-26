const mongoose = require('mongoose');


const SubSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    timeDuration: {
        type: String,
    },
    videoURL: {
        type: String,
    },
    description: {
        type: String,
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('SubSection', SubSectionSchema);