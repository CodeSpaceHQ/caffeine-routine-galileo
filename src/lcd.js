var useUpmVersion = true;
// we want mraa to be at least version 0.6.1
var mraa = require('mraa');
var version = mraa.getVersion();
if(version >= 'v0.6.1') {
  console.log('mraa version (' + version + ') ok');
} else {
  console.log('mraa version(' + version + ') is old - this code may not work');
}

var displayMessage = (message) => {
  var lcd = require('jsupm_i2clcd');
  var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
  var red = 0;
  var green = 250;
  var blue = 0;
  display.setColor(red, green, blue);
  display.setCursor(0, 0);
  display.write('CaffeineRoutine');
  display.setCursor(1, 1);
  display.write(message);
}


module.exports = {displayMessage}
