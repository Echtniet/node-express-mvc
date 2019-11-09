const Datastore = require('nedb') // set up a temporary (in memory) database
const developerData = require('../data/developers.json') // read in data file
const petData = require('../data/pets.json')
const studentData = require('../data/students.json')
const courseData = require('../data/course.json')
const sectionData = require('../data/section.json')
const teacherData = require('../data/teachers.json')
// inject Express app to configure it - EVERYTHING in through argument list

module.exports = (app) => {
  console.log('START data seeder.')
  const db = {} // empty object to hold all collections

  //db.developers = new Datastore() // new object property
  db.teachers = new Datastore()
  db.students = new Datastore()
  db.course = new Datastore()
  db.section = new Datastore()
  db.pets = new Datastore()
  //db.developers.loadDatabase()
  db.teachers.loadDatabase() // call the loadDatabase method
  db.students.loadDatabase()
  db.course.loadDatabase()
  db.section.loadDatabase()
  db.pets.loadDatabase()
  
  // insert the sample data into our datastore
  //db.developers.insert(developerData)
  db.teachers.insert(teacherData)
  db.students.insert(studentData)
  db.course.insert(courseData)
  db.section.insert(sectionData)
  db.pets.insert(petData)

  // initialize app.locals (these objects are available to the controllers)
  //app.locals.developers = db.developers.find(developerData)
  app.locals.teachers = db.course.find(teacherData)
  app.locals.students = db.students.find(studentData)
  app.locals.course = db.course.find(courseData)
  app.locals.section = db.section.find(sectionData)
  app.locals.pets = db.pets.find(petData)
  
  //console.log(`${app.locals.developers.query.length} developers seeded`)
  console.log(`${app.locals.teachers.query.length} teachers seeded`)
  console.log(`${app.locals.students.query.length} students seeded`)
  console.log(`${app.locals.course.query.length} course seeded`)
  console.log(`${app.locals.section.query.length} section seeded`)
  console.log(`${app.locals.pets.query.length} pets seeded`)

  console.log('END Data Seeder. Sample data read and verified.')
}
