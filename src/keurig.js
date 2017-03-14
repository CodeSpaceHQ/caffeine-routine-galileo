var lcd;// eslint-disable-line vars-on-top, no-var
try {
  lcd = require('./lcd.js'); // eslint-disable-line global-require
} catch (e) {
  // This try is used to catch the error that will be thrown when this is run on
  // a machine that isn't the Intel Galileo
  // This is why there are severl eslint disabled.. until mocking of mraa can be found
}

const Messages = {
  HEATING_UP: 'Heating up.',
};

const Status = {
  WAITING: 0,
  HEATING_UP: 1,
  READY: 2,
  BREWING: 3,
};

class Keurig {

  constructor() {
    this._isHeated = false;
    this._status = 0;
    this._messages = Messages;
  }

  /*
  If Keurig is in waiting state, het up, else do nothing.
  */
  heatUp() {
    if (this._status === Status.WAITING) {
      lcd.displayMessage(this._messages.HEATING_UP);
      this._status = Status.HEATING_UP;
      return true;
    }
    return false;
  }
}

module.exports = Keurig;
