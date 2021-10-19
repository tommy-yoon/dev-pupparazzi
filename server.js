const express = require('express')
const hbs = require('express-handlebars')

const utils = require('./utils')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

module.exports = server

// show puppies
server.get('/', (req, res) => {
  // read the puppies from the data.json file using fs.readFile
  const puppies = utils.getPuppies((err, puppies) => {
    if (err) {
      res.status(500).render('error', {message:err.message})
    } else {
      res.render('home', puppies)
    }
  })
  // render the puppies using home
  // res.send('Pupparazzi')
})