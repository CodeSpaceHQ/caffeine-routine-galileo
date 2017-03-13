var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log(req.body);
  res.send(req.body)
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
