var express = require('express')
var bodyParser = require('body-parser')
var app = express()

try {
  var lcd = require('./lcd.js')
} catch (e) {
  console.log(e);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log(req.body);
  lcd.displayMessage(req.body.message)
  res.send(req.body)
})

var server = app.listen(3000, function () {
  console.log('Listening on port 3000!')
})

module.exports = server;
