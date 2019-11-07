/**
*  Pets model
*  Describes the characteristics of each attribute in a pets resource.
*
* @author Michael Burnes <me@mtburnes.dev>
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const PetsSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 30, //any names longer than this causes a confused animal. The developers will also be very confused.
        required: true,
        default: 'Name Error'
    },
    owner: {
        type: Student,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true, //pet birthdays are essential. No exceptions.
    },
    breed: {
        type: String,
        required: false,
    },
    friendly: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model('Pets', PetsSchema)
