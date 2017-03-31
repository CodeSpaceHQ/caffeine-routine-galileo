const express = require('express'); // Express server
const bodyParser = require('body-parser'); // JSON body parser
const Keurig = require('./keurig.js'); // Keurig emulator
const lcd = require('./lcd.js'); // Displaying text on LCD screen

const app = express(); // The actual express application
const keurig = new Keurig(); // The keurig emulator


// Prepares URL encoding for a JSON body
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Tells the applicatoin to expect a JSON body in request
app.use(bodyParser.json());

// Displays a message to the LCD screen
app.post('/', (req, res) => {
  lcd.displayMessage({
    message: req.body.message,
    red: 0,
    green: 250,
    blue: 0,
  });
  res.send(req.body);
});

// Heat up water
app.post('/heat', (req, res) => {
  keurig.heatUp();
  res.send('Heating up');
});

// Brew coffee
app.post('/brew', (req, res) => {
  keurig.brew(req.body.size, (err) => {
    if (err) res.status(400).send(err.message);
    else res.send('Brewing');
  });
});


// Retrieve schedule
app.get('/schedule', (req, res) => {
  res.send(keurig.getSchedule());
});

// Update schedule
app.post('/schedule', (req, res) => {
  keurig.setSchedule(req.body.schedule);
  res.send('Schedule set');
});

// Set server to listen to port
const server = app.listen(3000);

// So server can be externally accessed for testing
module.exports = server;
