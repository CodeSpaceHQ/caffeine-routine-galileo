const express = require('express');
const bodyParser = require('body-parser');
const Keurig = require('./keurig.js');
const lcd = require('./lcd.js');

const app = express();
const keurig = new Keurig();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  lcd.displayMessage(req.body.message); // eslint-disable-line block-scoped-var
  res.send(req.body);
});

app.post('/heat', (req, res) => {
  keurig.heatUp();
  res.send('Heating up');
});

const server = app.listen(3000);

module.exports = server;
