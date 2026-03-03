const mongoose = require('mongoose');


const SectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    subSections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
        required: true
    }]
});

module.exports = mongoose.model('Section', SectionSchema);