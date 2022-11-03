const express = require('express')
const router = express.Router()
const { getReviews, getPhotos } = require('./models.js')

router.get('/', (reqRev, res) => {
  // let finalObj = {}
  // let reviewsObj = {
  //   photos: []
  // }
  getReviews(reqRev.body.product_id, (err, result1) => {
    if (err) {
      console.log(err, 'error in server get')
    } else {
      console.log(result1)
      res.send(result1)
    }
  })
 })

module.exports = router;