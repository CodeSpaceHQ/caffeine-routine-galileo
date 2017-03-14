const lcd = require('jsupm_i2clcd');

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
