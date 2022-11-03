const express = require('express')
const app = express()
require('dotenv').config()
const { getReviews } = require('./db.js')
app.use(express.json())

app.get('/', (req, res) => {
 getReviews((err, result) => {
   if (err) {
     console.log(err, 'error in server get')
   } else {
     res.send(result)
   }
   res.end()
 })
})


const PORT = process.env.PORT
app.listen(PORT, function(err){
 if (err) console.log(err);
 console.log("Server listening on PORT", PORT);
});

