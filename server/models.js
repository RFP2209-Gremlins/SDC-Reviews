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

 const getMetaData = (productID, callback) => {
  let query = `SELECT json_build_object(
    'product_id', ${productID},
    'ratings', (SELECT json_build_object(
      1, (SELECT COUNT(rating) FROM reviews WHERE product_id = ${productID} AND rating = 1),
      2, (SELECT COUNT(rating) FROM reviews WHERE product_id = ${productID} AND rating = 2),
      3, (SELECT COUNT(rating) FROM reviews WHERE product_id = ${productID} AND rating = 3),
      4, (SELECT COUNT(rating) FROM reviews WHERE product_id = ${productID} AND rating = 4),
      5, (SELECT COUNT(rating) FROM reviews WHERE product_id = ${productID} AND rating = 5)
    )),
    'recommended', (SELECT json_build_object(
      false, (SELECT COUNT(recommend) FROM reviews WHERE product_id = ${productID} AND recommend = 'f'),
      true, (SELECT COUNT(recommend) FROM reviews WHERE product_id = ${productID} AND recommend = 't')
    )),
    'characteristics', (SELECT json_object_agg(
      name, (json_build_object(
        'id', id,
        'value', (select AVG(value) from characteristic_reviews where characteristic_id = characteristics.id)
      ))
    )FROM characteristics WHERE product_id = ${productID})
  )`
  client.query(query, (err, res) => {
    if (err) {
      console.log(err, 'ERROR in getMetaData - models.js')
    } else {
      callback(null, res.rows[0].json_build_object)
    }
  })
 }





 module.exports = {
  getReviews,
  getMetaData
 }