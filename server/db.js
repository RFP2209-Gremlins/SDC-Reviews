require('dotenv').config()
const { Client, Pool } = require('pg')

const client = new Pool({
 user: process.env.PGUSER,
 host: process.env.PGHOST,
 database: process.env.PGDATABASE,
 password: process.env.PGPASSWORD,
 port: process.env.PGPORT,
})


client.connect((err) => {
 if (err) {
   console.log(err, 'CONNECTION ERR')
 } else {
   console.log('CONNECTED')
 }
})

module.exports = {
 client
}
