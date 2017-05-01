const express = require('express'); // Express server
const bodyParser = require('body-parser'); // JSON body parser
// const Keurig = require('./keurig.js'); // Keurig emulator
// const lcd = require('./lcd.js'); // Displaying text on LCD screen

const app = express(); // The actual express application
// const keurig = new Keurig(); // The keurig emulator


// Prepares URL encoding for a JSON body
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Tells the applicatoin to expect a JSON body in request
app.use(bodyParser.json());

// Displays a message to the LCD screen
app.post('/', (req, res) => {
  console.log('post');
  res.send(req.body);
});

// Heat up water
app.post('/heat', (req, res) => {
  console.log('Heating up');
  res.send('Heating up');
});

// Brew coffee
app.post('/brew', (req, res) => {
  console.log('brewing');
  res.send(req.body);
});


// Retrieve schedule
app.get('/schedule', (req, res) => {
  console.log('retrieving schedule');
  res.send('get schedule');
});

// Update schedule
app.post('/schedule', (req, res) => {
  res.send('update schedule');
  res.send('Schedule set');
});

// Set server to listen to port
const server = app.listen(3000);
console.log('listening on port 3000');
// So server can be externally accessed for testing
module.exports = server;
