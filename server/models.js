const { client } = require('./db.js')

const getReviews = (productID, page, count = 5, sort, callback) => {
  let pages = page || 1;
  if (sort === 'newest') {
    sort = 'date DESC'
  } else if (sort === 'helpfulness') {
    sort = 'helpfulness DESC'
  } else {
    sort = 'date DESC, helpfulness DESC'
  }
  console.log(sort, 'SORT')
  let query = `SELECT json_build_object(
    'product', ${productID},
    'page', ${pages},
    'count', ${count},
    'results', (
      WITH result AS (
        SELECT * FROM reviews WHERE product_id = ${productID} AND reported = 'f' GROUP BY reviews.id ORDER BY ${sort} LIMIT ${count})
      SELECT json_agg(
      json_build_object(
        'review_id', id,
        'rating', rating,
        'summary', summary,
        'recommend', recommend,
        'response', response,
        'body', body,
        'date', to_timestamp(date::bigint/1000) AT TIME ZONE 'UTC',
        'reviewer_name', reviewer_name,
        'helpfulness', helpfulness,
        'photos', COALESCE(
          (SELECT json_agg(
            json_build_object(
              'id', id,
              'url', url
            )
          )FROM reviews_photos where review_id = result.id), '[]'
        )
      )
    ) FROM result)
  )`
  client.query(query, (err, res) => {
    if (err) {
      console.log(err, 'ERROR in getReviews - models.js')
    } else {
      callback(null, res.rows[0].json_build_object)
    }
  })
 }
//  GROUP BY reviews ORDER BY ${sort} LIMIT ${count}

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

 const markHelpful = (reviewID, callback) => {
  let query = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id =${reviewID}`;
  client.query(query)
    .then(result => callback(null, result))
    .catch(err => console.log(err))
 }

 const reportReview = (reviewID, callback) => {
  let query = `UPDATE reviews SET reported = true WHERE id =${reviewID}`;
  client.query(query)
    .then(result => callback(null, result))
    .catch(err => console.log(err))
 }

 const postReview = (productID, rating, summary, body, recommend, name, email, photos, characteristics, callback) => {
  let charKey = Object.keys(characteristics);
  console.log(characteristics, 'CHAR')
  console.log(charKey, 'KEEYS')
  let charValues = Object.values(characteristics);
  console.log(charValues, 'VALUES')
  console.log(summary)
  // let date = new Date().getTime();
  // console.log(date, 'DATE')
  // ${date},
  if (photos.length > 0) {
    let query = `WITH review_post AS (
      INSERT INTO reviews(product_id, rating, date, recommend, summary, body, reviewer_name, reviewer_email)
      VALUES (${productID}, ${rating}, ${recommend}, ${summary}, ${body}, ${name}, ${email})
      RETURNING id AS review_id
      ), char_post AS (
        INSERT INTO characteristics_reviews(characteristic_id, review_id, value)
        SELECT review_id, UNNEST[ARRAY(${charKey})])::INT, UNNEST[ARRAY(${charValues})])::INT FROM review_post),
        INSERT INTO reviews_photos(review_id, url) SELECT review_id, UNNEST[ARRAY(${photos})]::VARCHAR FROM review_post`
    client.query(query)
      .then(result => callback(null, result))
      .catch(err => console.log(err, 'ERROR IN POST w/ photos - models.js'))
  } else {
    let query = `WITH review_post AS (
      INSERT INTO reviews(product_id, rating, recommend, summary, body, reviewer_name, reviewer_email)
      VALUES (${productID}, ${rating}, ${recommend}, ${summary}, ${body}, ${name}, ${email})
      RETURNING id AS review_id
      ), char_post AS (
        INSERT INTO characteristics_reviews(characteristic_id, review_id, value)
        SELECT review_id, UNNEST[ARRAY(${charKey})])::INT, UNNEST[ARRAY(${charValues})])::INT FROM review_post
        )`
    client.query(query)
      .then(result => callback(null, result))
      .catch(err => console.log(err, 'ERROR IN POST w/o photos - models.js'))
  }
 }

 //new Date().getTime()
// product_id
// rating
// summary
// body
// recommend
// name
// email
// photos
// characteristics

 module.exports = {
  getReviews,
  getMetaData,
  markHelpful,
  reportReview,
  postReview
 }