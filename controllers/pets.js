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
api.get('/details', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.end("Detail request")
  // res.send(JSON.stringify(item))
})

// GET delete
api.get('/delete', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.end("Delete request")
  // res.send(JSON.stringify(item))
})

// GET edit
  api.get('/edit', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.end("Edit request")
  // res.send(JSON.stringify(item))
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
// function handleCreate(){}
// function handleUpdate(){}
// function handleDelete(){}


// RESPOND WITH VIEWS  --------------------------------------------

// later

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// later

module.exports = api
