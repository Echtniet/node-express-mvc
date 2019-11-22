/**
*  Section model
*  Describes the characteristics of each attribute in the Section resource.
*
* @author Cole Houston <s522101@nwmissouri.edu>
* @requires mongoose
*
*/
//reference teacher id, course id, student id

const mongoose = require('mongoose')
const SectionSchema = new mongoose.Schema({

    _id: {
		type: Number,
		required: true
    },
    sectionNumber: {
		type: Number,
		required: true
    },
    days: {
		type: String,
		minlength: 2,
		maxlength: 3,
		required: true,
		default: 'MWF'
    },
    startTime: {
		type: Number,
		required: true
    },
    roomNumber: {
    	type: Number,
    	required: true
    },
    instructorID: {
    	type: Number,
    	required: true
    },
    courseID: {
    	type: Number,
    	required: true
    }

})

module.exports = mongoose.model('Section', SectionSchema)
