require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
 user: process.env.DB_USER,
 host: process.env.DB_HOST,
 database: process.env.DB_DATABASE,
 password: process.env.DB_PASSWORD
})
const connection = client.connect((err) => {
 if (err) {
   console.log(err, 'CONNECTION ERR')
 } else {
   console.log('CONNECTED')
 }
})



module.exports = {
 client
}
