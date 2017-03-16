'use strict';
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
    this.schedule = [];
    this._isHeated = false;
    this._status = 0;
    this._messages = Messages;
    lcd.displayMessage(Messages.WAITING);
  }

  markReady() {
    this._status = Status.READY;
    lcd.displayMessage(Messages.READY);
  }
  /*
  If Keurig is in waiting state, heat up, else do nothing.
  */
  heatUp() {
    if (this._status === Status.WAITING) {
      lcd.displayMessage(Messages.HEATING_UP);
      this._status = Status.HEATING_UP;
      setTimeout(this.markReady, 5000); // Time to brew in milliseconds
      return true;
    }
    return false;
  }

  brew(size, cb) {
    if (!this.validateSize(size)) {
      cb(new Error('Invalid size'));
      return;
    }
    if (this._status === Status.READY) {
      lcd.displayMessage(Mssages.BREWING);
      this._status = Status.BREWING;
      cb(null);
      return;
    }
    cb(new Error('Keurig not ready.'));
  }

  getSchedule() {
    return this.schedule;
  }

  setSchedule(schedule) {
    this.schedule = schedule;
  }

  validateSize(size) {
    const upperSize = size.toUpperCase();
    if (upperSize === 'SMALL') return true;
    if (upperSize === 'MEDIUM') return true;
    if (upperSize === 'LARGE') return true;
    return false;
  }
}
module.exports = Keurig;
