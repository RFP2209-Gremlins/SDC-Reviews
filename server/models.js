const { client } = require('./db.js')

const getReviews = (productID, callback) => {
  client.query(`SELECT * FROM reviews WHERE product_id = ${productID}`, (err, res) => {
    if (err) {
      console.log(err, 'ERROR in getReviews')
    } else {
      callback(null, res.rows)
    }
  })
 }

 const getPhotos = (reviewID, callback) => {
  client.query(`SELECT * FROM reviews_photos WHERE review_id = ${reviewID}`, (err, res) => {
    if (err) {
      console.log(err, 'ERROR in getReviews')
    } else {
      callback(null, res.rows)
    }
  })
 }

 module.exports = {
  getReviews,
  getPhotos
 }