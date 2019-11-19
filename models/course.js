/**
*  Course model
*  Describes the characteristics of each attribute in the Course resource.
*
* @author Jacob Taylor <s526858@nwmissouri.edu>
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true
    },
    courseName: {
        type: String,
        minlength: 3,
        maxlength: 40, 
        required: true,
        default: 'Name Error'
    },
    professor: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Course', CourseSchema)
