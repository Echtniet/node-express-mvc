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
    courseId: {
	type: Number,
	required: true
    },
    professorId{
	type: Number,
	required: true
    },
    studentId{
	type: Number,
	required: true
    }
})

module.exports = mongoose.model('Section', SectionSchema)
