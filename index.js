var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var lcd = require('./lcd.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log(req.body);
  lcd.displayMessage(req.body.message)
  res.send(req.body)
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
