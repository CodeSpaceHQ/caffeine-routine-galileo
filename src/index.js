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
  lcd.displayMessage({
    message: req.body.message,
    red: 0,
    green: 250,
    blue: 0,
  });
  res.send(req.body);
});

app.post('/heat', (req, res) => {
  keurig.heatUp();
  res.send('Heating up');
});

app.post('/brew', (req, res) => {
  keurig.brew(req.body.size, (err) => {
    if (err) res.status(400).send(err.message);
    else res.send('Brewing');
  });
});

app.get('/schedule', (req, res) => {
  res.send(keurig.getSchedule());
});

app.post('/schedule', (req, res) => {
  keurig.setSchedule(req.body.schedule);
  res.send('Schedule set');
});

const server = app.listen(3000);

module.exports = server;
