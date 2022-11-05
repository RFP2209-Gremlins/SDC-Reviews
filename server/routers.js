const express = require('express')
const router = express.Router()
const { getReviews, getMetaData } = require('./models.js')

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

 router.get('/reviews/meta', (req, res) => {
  const { product_id } = req.body;
  getMetaData(product_id, (err, result) => {
    if (err) {
      console.log(err, 'error in server get')
    } else {
      console.log(result)
      res.send(result)
    }
  })
 })

module.exports = router;