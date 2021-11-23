const express = require('express')
const hbs = require('express-handlebars')
const fileUpload = require('express-fileupload')

const routes = require('./routes')
const utils = require('./utils')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// file upload
// default options
server.use(fileUpload())

// Your routes/router(s) should go here
server.use('/puppies', routes)

module.exports = server

// show puppies
server.get('/', (req, res) => {
  // get the puppies object from utils
  utils.getPuppies((err, puppies) => {
    if (err) {
      res.status(500).render('error', { message: err.message })
    } else {
      res.render('home', puppies)
    }
  })
})
