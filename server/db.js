require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
})
// client.connect((err) => {
//   if(err) => {
//     console.log(err, 'CONNECTION ERR')
//   } else {
//     console.log('CONNECTED')
//   }
// })

// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })