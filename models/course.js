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
    CourseName: {
        type: String,
        minlength: 3,
        maxlength: 40, 
        required: true,
        default: 'Name Error'
    },
    Professor: {
        type: Teacher,
        required: true,
    },
    Location: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true, 
    },
    Section: {
        type: Number,
        required: true,
    },
    Time: {
        type: Time,
        required: true,
    },
    Capacity: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Course', CourseSchema)
