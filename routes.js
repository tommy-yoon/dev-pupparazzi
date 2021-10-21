const express = require('express')
const utils = require('./utils')
const router = express.Router()

const imagePath = '/images/'

module.exports = router

router.get('/:id/delete', (req, res) => {
  const id = Number(req.params.id)

  utils.deletePuppy(id, (err) => {
    if (err) {
      res.status(500).render('error', { message: err.message })
    } else {
      res.redirect('/')
    }
  })
})

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
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).render('error', { message: 'Uploaded file is missing' });
  }
  newPuppy["image"] = imagePath + req.files.image.name

  utils.addPuppy(newPuppy, (err, id) => {
    if (err) {
      res.status(500).render('error', { message: err.message })
    } else {
      // saving image file
      const imageFile = req.files.image;
      utils.uploadFile(imageFile, (err) => {
        if (err) {
          res.status(500).render('error', { message: err.message })
        } else {
          res.redirect('/puppies/' + id)
        }
      })
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