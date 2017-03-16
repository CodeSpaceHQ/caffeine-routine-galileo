const lcd = require('jsupm_i2clcd');

const validateColor = (color) => {
  if (color < 0 || color > 255) throw new Error(`${color} is an invalid RGB number`);
};

const validateColors = (red, green, blue) => {
  try {
    validateColor(red);
    validateColor(green);
    validateColor(blue);
  } catch (err) {
    throw err;
  }
};

const displayMessage = (data) => {
  try {
    validateColors(data.red, data.green, data.blue);
  } catch (err) {
    throw err;
  }
  const display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
  const red = data.red;
  const green = data.green;
  const blue = data.blue;
  const message = data.message;
  display.setColor(red, green, blue);
  display.setCursor(0, 0);
  display.write('CaffeineRoutine');
  display.setCursor(1, 1);
  display.write(message);
};

module.exports = { displayMessage };
