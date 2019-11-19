/**
*  Pets controller
*  Handles requests related to pets resources.
*
* @author Michael Burnes <me@mtburnes.dev>
*
*/
const express = require('express')
const api = express.Router()
const Model = require('../models/pets.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const notfoundstring = "Could not find pet with ID="


// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  LOG.info(`Handling /findall ${req}`)
  Model.find({}, (err, data) => {
    if (err) {
      return res.end('Error finding all')
    }
    res.json(data)
  })
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  LOG.info(`Handling /findone ${req}`)
  const id = parseInt(req.params.id)
  Model.find({_id: id}, (err, results) => {
    if (err) { return res.end(`Pet with ID = ${id} not found.`)}
    res.json(results[0])
  })
})

// GET index
api.get('/index', (req, res) => {
  LOG.info(`Handling GET / ${req}`)
  Model.find({}, (err, data) => {
    if (err) { return res.end('Error') }
    res.locals.pets = data
    res.render('pets/index.ejs')
  })
})

// GET details
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.pet = results[0]
    return res.render('pets/details.ejs')
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
    return res.redirect('/pets/index')
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
    return res.render('pets/edit.ejs')
  })
})

// GET create
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create ${req}`)
  Model.find({}, (err, data) => {
    if (err) { return res.end('error on create') }
    res.locals.pets = data
    res.locals.pet = new Model()
    res.render('pets/create')
  })
})

// GET edit
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(results)}`)
    res.locals.pet = results[0]
    return res.render('pets/edit.ejs')
  })
})

// CRUD METHODS
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id)
  item.name = req.body.name
  item.ownerId = req.body.ownerId
  item.birthDate = req.body.birthDate
  item.breed = req.body.breed
  item.friendly = req.body.friendly
  item.save((err) => {
    if (err) { return res.end('ERROR: item could not be saved') }
    LOG.info(`SAVING NEW item ${JSON.stringify(item)}`)
    return res.redirect('/pets/index')
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
        name: req.body.name,
        ownerId: req.body.ownerId,
        birthDate: req.body.birthDate,
        breed: req.body.breed,
        friendly: req.body.friendly
      }
    },
    (err, item) => {
      if (err) { return res.end(notfoundstring) }
      LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
      LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
      LOG.info(`SAVING UPDATED item ${JSON.stringify(item)}`)
      return res.redirect('/pets/index')
    })
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling REMOVING ID=${id}`)
  Model.remove({ _id: id }).setOptions({ single: true }).exec((err, deleted) => {
    if (err) { return res.end(notfoundstring) }
    console.log(`Permanently deleted pet ${JSON.stringify(deleted)}`)
    return res.redirect('/pets/index')
  })
})

// RESPOND WITH VIEWS  --------------------------------------------

// later

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// later

module.exports = api
