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

})

module.exports = mongoose.model('Pets', PetsSchema)
