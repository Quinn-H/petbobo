var express = require('express')
var app = express()
var PORT = process.env.PORT || 3000

// Set the 'static' directory to the project root - where index.html resides
app.use(express.static('./'))

// When root is requested, send index.html as a response
app.get('/', function (req, res) {
  res.send('index.html')
})

// Create the server by listening on the desired port
app.listen(PORT, function () {
  console.log('listening on port', PORT)
})
