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
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.teachers.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id)
  const data = req.app.locals.teachers.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.send(JSON.stringify(item))
})

// GET index
api.get('/index', (req, res) => {
  LOG.info(`Handling GET / ${req}`)
  Model.find({}, (err, data) => {
    if (err) { return res.end('Error') }
    res.locals.developers = data
    res.render('teachers/index.ejs')
  })
})

// GET details
api.get('/details', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.end("Detail request")
  res.send(JSON.stringify(item))
})

// GET delete
api.get('/delete', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.end("Delete request")
  res.send(JSON.stringify(item))
})

// GET edit
  api.get('/edit', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.end("Edit request")
  res.send(JSON.stringify(item))
})

// GET create
api.get('/create', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.end("Create request")
  res.send(JSON.stringify(item))
})

api.post('/postcreate', (req, res) =>{
  res.setHeader('Content-Type', 'application/json')
  return res.end("Post create request")
  res.send(JSON.stringify(item))
})

// CRUD METHODS
function handleCreate(){}
function handleUpdate(){}
function handleDelete(){}

// RESPOND WITH VIEWS  --------------------------------------------

// later

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// later

module.exports = api
