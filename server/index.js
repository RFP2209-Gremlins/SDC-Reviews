const express = require('express')
const app = express()
const router = require('./routers.js')
require('dotenv').config()
app.use(express.json())

app.use('/', router)


const PORT = process.env.PORT
app.listen(PORT, function(err){
 if (err) console.log(err);
 console.log("Server listening on PORT", PORT);
});

