'use strict'; // eslint-disable-line strict, lines-around-directive

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
    this._messages = Messages;
    context = this;
    this.switchState(State.WAITING);
  }

  switchState(newState) {
    switch (newState) {
      case State.WAITING:
        lcd.displayMessage(Messages.WAITING);
        break;
      case State.HEATING_UP:
        if (context._state === State.WAITING) lcd.displayMessage(Messages.HEATING_UP);
        else throw new Error('Cannot heat up, not in waiting state.');
        break;
      case State.READY:
        if (context._state === State.HEATING_UP) lcd.displayMessage(Messages.READY);
        break;
      case State.BREWING:
        if (context._state === State.READY) lcd.displayMessage(Messages.BREWING);
        else throw new Error('Keurig not ready.');
        break;
      default:
        throw new Error('Unreachable');
    }

    context._state = newState;
  }

  markReady() {
    context.switchState(State.READY);
  }
  /*
  If Keurig is in waiting state, heat up, else do nothing.
  */
  heatUp() {
    try {
      this.switchState(State.HEATING_UP);
      context = this;
      setTimeout(this.markReady, 5000); // Time to brew in milliseconds
      return true;
    } catch (err) {
      return false;
    }
  }

  brew(size, cb) {
    if (!this.validateSize(size)) {
      cb(new Error('Invalid size'));
      return;
    }
    try {
      this.switchState(State.BREWING);
      cb(null);
    } catch (err) {
      cb(new Error(err.message));
    }
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
