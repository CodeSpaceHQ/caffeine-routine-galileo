const express = require('express');
const bodyParser = require('body-parser');

try {
  var lcd = require('./lcd.js'); // eslint-disable-line vars-on-top, global-require, no-var
} catch (e) {
  // This try is used to catch the error that will be thrown when this is run on
  // a machine that isn't the Intel Galileo
  // This is why there are severl eslint disabled.. until mocking of mraa can be found
}

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  lcd.displayMessage(req.body.message); // eslint-disable-line block-scoped-var
  res.send(req.body);
});

const server = app.listen(3000);

module.exports = server;
