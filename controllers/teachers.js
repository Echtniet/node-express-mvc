/**
*  Developer controller
*  Handles requests related to developer resources.
*
* @author Denise Case <dcase@nwmissouri.edu>
*
*/


const express = require('express')
const api = express.Router()
const Model = require('../models/teacher.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const notfoundstring = 'Could not find developer with id='

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  LOG.info(`Handling /findall ${req}`)
  Model.find({}, (err, data) => {
    if (err) { return res.end('Error finding all') }
    res.json(data)
  })
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  LOG.info(`Handling /findone ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(`notfoundstring ${id}`) }
    res.json(results[0])
  })
})

// GET index
api.get('/index', (req, res) => {
  LOG.info(`Handling GET / ${req}`)
  Model.find({}, (err, data) => {
    if (err) { return res.end('Error') }
    res.locals.teachers = data
    res.render('teachers/index.ejs')
  })
})

// GET details
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.teacher = results[0]
    return res.render('teachers/details.ejs')
  })
})

// GET delete
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling REMOVING ID=${id}`)
  Model.remove({ _id: id }).setOptions({ single: true }).exec((err, deleted) => {
    if (err) { return res.end(notfoundstring) }
    console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
    return res.redirect('/teachers/index')
  })
})

// GET edit
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(results)}`)
    res.locals.teacher = results[0]
    return res.render('teachers/edit.ejs')
  })
})

// GET create
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create ${req}`)
  Model.find({}, (err, data) => {
    if (err) { return res.end('error on create') }
    res.locals.teachers = data
    res.locals.teacher = new Model()
    res.render('teachers/create')
  })
})

api.post('/postcreate', (req, res) =>{
  res.setHeader('Content-Type', 'application/json')
  return res.end("Post create request")
  res.send(JSON.stringify(item))
})



// CRUD METHODS
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id)
  item.email = req.body.email
  item.given = req.body.given
  item.family = req.body.family
  item.salary = req.body.salary
  item.github = req.body.github
  item.save((err) => {
    if (err) { return res.end('ERROR: item could not be saved') }
    LOG.info(`SAVING NEW item ${JSON.stringify(item)}`)
    return res.redirect('/teachers/index')
  })
})

// POST save with id
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling SAVING ID=${id}`)
  Model.updateOne({ _id: id },
    { // use mongoose field update operator $set
      $set: {
        email: req.body.email,
        given: req.body.given,
        family: req.body.family,
        salary: req.body.salary,
        githb: req.body.github
      }
    },
    (err, item) => {
      if (err) { return res.end(notfoundstring) }
      LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
      LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
      LOG.info(`SAVING UPDATED item ${JSON.stringify(item)}`)
      return res.redirect('/teachers/index')
    })
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling REMOVING ID=${id}`)
  Model.remove({ _id: id }).setOptions({ single: true }).exec((err, deleted) => {
    if (err) { return res.end(notfoundstring) }
    console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
    return res.redirect('/teachers/index')
  })
})

// RESPOND WITH VIEWS  --------------------------------------------

// later

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// later

module.exports = api
