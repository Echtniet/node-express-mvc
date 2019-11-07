/**
*  Student model
*  Describes the characteristics of each attribute in a student resource.
*
* @author Ben Brown <s531795@nwmissouri.edu>
* @requires mongoose
*
*/

const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true
    },
    given: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: false,
        default: 'Given name'
    },
    family: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: false,
        default: 'Family name'
    },
    email: {
        type: String,
        required: false,
        default: 'yourname@somewebsite.com'
    },
    gpa: {
        type: Number,
        required: false,
        default: '3.69'
    },
    github: {
        type: String,
        required: false,
        default: 'github.com/yourname'
    },
    website: {
        type: String,
        required: false,
        default: 'yourwebsitehere.com'
    },
    sectionID: {
        type: Number,
        required: false,
        default: '1'
    }
})
module.exports = mongoose.model('Student', StudentSchema)