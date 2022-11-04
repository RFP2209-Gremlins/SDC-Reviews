const express = require('express')
const router = express.Router()
const { getReviews, getPhotos } = require('./models.js')

router.get('/reviews/', (req, res) => {
  const { product_id, page, count } = req.body;
  getReviews(product_id, page, count, (err, result1) => {
    if (err) {
      console.log(err, 'error in server get')
    } else {
      console.log(result1)
      res.send(result1)
    }
  })
 })

module.exports = router;