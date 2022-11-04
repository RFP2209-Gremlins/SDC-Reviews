const { client } = require('./db.js')

const getReviews = (productID, page, count, callback) => {
  let query = `SELECT json_build_object(
    'product', ${productID},
    'page', ${page},
    'count', ${count},
    'results', (SELECT json_agg(
      json_build_object(
        'review_id', reviews.id,
        'rating', rating,
        'summary', summary,
        'recommend', recommend,
        'response', response,
        'body', body,
        'date', to_timestamp(CAST(date as bigint)/1000),
        'reviewer_name', reviewer_name,
        'helpfulness', helfulness,
        'photos', (SELECT json_agg(
          json_build_object(
            'id', id,
            'url', url
          )
        )FROM reviews_photos where review_id = reviews.id)
      )
    ) FROM reviews WHERE product_id = ${productID} AND reported = 'f')
  )`
  client.query(query, (err, res) => {
    if (err) {
      console.log(err, 'ERROR in getReviews')
    } else {
      callback(null, res.rows[0].json_build_object)
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