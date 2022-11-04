const { client } = require('./db.js')

const getReviews = (productID, callback) => {
  let query = `SELECT json_build_object(
    'product_id', ${productID},
    'count', (SELECT COUNT(id) FROM reviews WHERE product_id = ${productID}),
    'results', (SELECT json_agg(
      json_build_object(
        'review_id', id,
        'rating', rating,
        'summary', summary,
        'response', response,
        'body', body,
        'date', date,
        'reviewer_name', reviewer_name,
        'helpfulness', helfulness
      )
    )FROM reviews WHERE product_id = ${productID} AND reported = false)
  )`
  client.query(query, (err, res) => {
    if (err) {
      console.log(err, 'ERROR in getReviews')
    } else {
      callback(null, res)
    }
  })
 }
//  `SELECT * FROM reviews WHERE product_id = ${productID}`
//  const getPhotos = (reviewID, callback) => {
//   client.query(`SELECT * FROM reviews_photos WHERE review_id = ${reviewID}`, (err, res) => {
//     if (err) {
//       console.log(err, 'ERROR in getReviews')
//     } else {
//       callback(null, res.rows)
//     }
//   })
//  }

// (SELECT json_agg(
//   json_build_object(
//     'id', id,
//     'url', (SELECT json_agg(url) FROM reviews_photos)
//   )
// )FROM reviews_photos WHERE reviews_photos.review_id = review_id)

 module.exports = {
  getReviews
 }