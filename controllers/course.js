/**
*  Course controller
*  Handles requests related to course resources.
*
* @author Jacob Taylor <s526858@nwmissouri.edu>
*
*/
const express = require('express')
const api = express.Router()
// const Model = require('../models/course.js')
const find = require('lodash.find')
const notfoundstring = 'Could not find course with id='

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.course.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id)
  const data = req.app.locals.course.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.send(JSON.stringify(item))
})

// GET index
api.get('/index', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.end("Index request")
  res.send(JSON.stringify(item))
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

// CRUD METHODS
function handleCreate(){}
function handleUpdate(){}
function handleDelete(){}

// RESPOND WITH VIEWS  --------------------------------------------

// later

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// later

module.exports = api
