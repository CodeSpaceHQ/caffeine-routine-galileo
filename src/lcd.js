var lcd; // eslint-disable-line no-var
try {
  lcd = require('jsupm_i2clcd'); // eslint-disable-line vars-on-top, global-require, no-var
} catch (e) {
  // This try is used to catch the error that will be thrown when this is run on
  // a machine that isn't the Intel Galileo
  // This is why there are severl eslint disabled.. until mocking of mraa can be found
}
// we want mraa to be at least version 0.6.1
// This import is the trouble one that has resulted in all eslint issues
// const mraa = require('mraa'); // eslint-disable-line import/no-unresolved

const displayMessage = (message) => {
  const display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
  const red = 0;
  const green = 250;
  const blue = 0;
  display.setColor(red, green, blue);
  display.setCursor(0, 0);
  display.write('CaffeineRoutine');
  display.setCursor(1, 1);
  display.write(message);
};

module.exports = { displayMessage };
