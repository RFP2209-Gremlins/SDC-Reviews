const express = require('express')
const app = express()
const router = require('./routers.js')
const morgan = require('morgan')
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true} ));

app.use('/', router)
app.use(morgan('dev'))

const PORT = process.env.PORT
app.listen(PORT, function(err){
 if (err) console.log(err);
 console.log("Server listening on PORT", PORT);
});

