const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hellp World')
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
