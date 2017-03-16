'use strict';
const lcd = require('./lcd.js');

const Messages = {
  WAITING: 'Waiting',
  HEATING_UP: 'Heating up',
  READY: 'Ready',
  BREWING: 'Brewing',
};

const State = {
  WAITING: 0,
  HEATING_UP: 1,
  READY: 2,
  BREWING: 3,
};
let context;
class Keurig {

  constructor() {
    this.schedule = [];
    context = this;
    this._state = 0;
    this._messages = Messages;
    lcd.displayMessage(Messages.WAITING);
  }

  updateState(newState) {

  }

  markReady() {
    context._state = State.READY;
    lcd.displayMessage(Messages.READY);
  }
  /*
  If Keurig is in waiting state, heat up, else do nothing.
  */
  heatUp() {
    if (this._state === State.WAITING) {
      lcd.displayMessage(Messages.HEATING_UP);
      this._state = State.HEATING_UP;
      context = this;
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
    if (this._state === State.READY) {
      lcd.displayMessage(Messages.BREWING);
      this._state = State.BREWING;
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
