const Datastore = require('nedb') // set up a temporary (in memory) database
const developerData = require('../data/developers.json') // read in data file
const petData = require('../data/pets.json')
const studentData = require('../data/students.json')
// inject Express app to configure it - EVERYTHING in through argument list

module.exports = (app) => {
  console.log('START data seeder.')
  const db = {} // empty object to hold all collections

  db.developers = new Datastore() // new object property
  db.pets = new Datastore()
  db.students = new Datastore()
  db.developers.loadDatabase() // call the loadDatabase method
  
  // insert the sample data into our datastore
  db.developers.insert(developerData)
  db.pets.insert(petData)
  db.students.insert(studentData)

  // initialize app.locals (these objects are available to the controllers)
  app.locals.developers = db.developers.find(developerData)
  app.locals.pets = db.pets.find(petData)
  app.locals.students = db.students.find(studentData)
  console.log(`${app.locals.developers.query.length} developers seeded`)
  console.log(`${app.locals.pets.query.length} pets seeded`)
  console.log(`${app.locals.students.query.length} students seeded`)

  console.log('END Data Seeder. Sample data read and verified.')
}
