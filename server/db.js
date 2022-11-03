require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
 user: process.env.DB_USER,
 host: process.env.DB_HOST,
 database: process.env.DB_DATABASE,
 password: process.env.DB_PASSWORD
})
client.connect((err) => {
 if (err) {
   console.log(err, 'CONNECTION ERR')
 } else {
   console.log('CONNECTED')
 }
})

const getReviews = (callback) => {
 client.query('SELECT * FROM reviews_photos', (err, res) => {
   if (err) {
     console.log(err, 'ERROR in getReviews')
   } else {
     callback(null, res.rows)
   }
 })
}

module.exports = {
 getReviews
}
