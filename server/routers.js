const express = require('express')
const router = express.Router()
const { getReviews, getMetaData, markHelpful, reportReview, postReview } = require('./models.js')

router.get('/reviews/', (req, res) => {
  const { product_id, page, count, sort } = req.body;
  console.log(sort)
  getReviews(product_id, page, count, sort, (err, result1) => {
    if (err) {
      console.log(err, 'error in server get')
    } else {
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
      res.send(result)
    }
  })
 })

 router.put('/reviews/:review_id/helpful', (req, res) => {
  const { review_id } = req.params;
  markHelpful(review_id, (err, result) => {
    if (err) {
      console.log(err, 'ERROR IN PUT/helpful - routers.js')
    } else {
      res.end('Successful increment')
    }
  })
 })

 router.put('/reviews/:review_id/report', (req, res) => {
  const { review_id } = req.params;
  reportReview(review_id, (err, result) => {
    if (err) {
      console.log(err, 'ERROR IN PUT/report - routers.js')
    } else {
      res.end()
    }
  })
 })

 router.post('/reviews', (req, res) => {
  const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = req.body;
  postReview(product_id, rating, summary, body, recommend, name, email, photos, characteristics, (err, results) => {
    if (err) {
      console.log(err, 'ERROR IN PUT/report - routers.js')
    } else {
      res.send('POSTED')
    }
  })
 })

module.exports = router;