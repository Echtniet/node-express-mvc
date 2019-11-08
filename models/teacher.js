/**
*  Course model
*  Describes the characteristics of each attribute in the Course resource.
*
* @author Jacob Taylor <s526858@nwmissouri.edu>
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true
    },
    teacherName: {
        type: String,
        minlength: 3,
        maxlength: 40, 
        required: true,
        default: 'Name Error'
    },    
    office: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Teachers', TeacherSchema)
