/**
*  Course model
*  Describes the characteristics of each attribute in the Course resource.
*
* @author Clinton Davelaar <s533350@nwmissouri.edu>
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true
    },
    given: {
        type: String,
        minlength: 3,
        maxlength: 40, 
        required: true,
        default: 'Name Error'
    },
    family: {
        type: String,
        minlength: 3,
        maxlength: 40, 
        required: true,
        default: 'Name Error'
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 40, 
        required: true,
        default: 'Name Error'
    }, 
    salary:{
        type: Number,
        required: true
    },
    github: {
        type: String,
        minlength: 3,
        maxlength: 40, 
        required: true,
        default: 'github error'
    }
})

module.exports = mongoose.model('Teachers', TeacherSchema)
