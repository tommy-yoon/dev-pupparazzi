const express = require('express')
const utils = require('./utils')
const router = express.Router()

module.exports = router

router.get('/:id', (req, res) => {
  const id = req.params.id
  const puppy = utils.getPuppy(id, (err, puppy) => {
    if (err) {
      res.status(500).render('error', {message:err.message})
    } else {
      res.render('details', puppy)
    }
  })
})