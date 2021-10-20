const express = require('express')
const utils = require('./utils')
const router = express.Router()

module.exports = router

router.post('/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  const name = req.body.name
  const breed = req.body.breed
  const owner = req.body.owner
  const newPuppy = {
    "id": id,
    "name": name,
    "breed": breed,
    "owner": owner,
  }

  utils.updatePuppy(newPuppy, (err) => {
    if (err) {
      res.status(500).render('error', { message: err.message })
    } else {
      res.redirect('/puppies/' + id)
    }
  })
})

router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add', (req, res) => {
  const name = req.body.name
  const breed = req.body.breed
  const owner = req.body.owner
  const newPuppy = {
    "name": name,
    "breed": breed,
    "owner": owner,
  }
  utils.addPuppy(newPuppy, (err, id) => {
    if (err) {
      res.status(500).render('error', { message: err.message })
    } else {
      res.redirect('/puppies/' + id)
    }
  })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  utils.getPuppy(id, (err, puppy) => {
    if (err) {
      res.status(500).render('error', { message: err.message })
    } else {
      res.render('edit', puppy)
    }
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  utils.getPuppy(id, (err, puppy) => {
    if (err) {
      res.status(500).render('error', { message: err.message })
    } else {
      res.render('details', puppy)
    }
  })
})