const lcd = require('./lcd.js');

const Messages = {
  WAITING: 'Waiting',
  HEATING_UP: 'Heating up',
  READY: 'Ready',
  BREWING: 'Brewing',
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
    lcd.displayMessage(this._messages.WAITING);
  }

  /*
  If Keurig is in waiting state, heat up, else do nothing.
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
