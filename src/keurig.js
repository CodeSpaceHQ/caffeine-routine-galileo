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
        lcd.displayMessage({
          message: Messages.WAITING,
          red: 0,
          green: 255,
          blue: 255,
        });
        break;
      case State.HEATING_UP:
        if (context._state === State.WAITING) {
          lcd.displayMessage({
            message: Messages.HEATING_UP,
            red: 250,
            green: 69,
            blue: 0,
          });
        } else throw new Error('Cannot heat up, not in waiting state.');
        break;
      case State.READY:
        if (context._state === State.HEATING_UP) {
          lcd.displayMessage({
            message: Messages.READY,
            red: 50,
            green: 205,
            blue: 50,
          });
        }
        break;
      case State.BREWING:
        if (context._state === State.READY) {
          lcd.displayMessage({
            message: Messages.BREWING,
            red: 65,
            green: 105,
            blue: 225,
          });
        } else throw new Error('Keurig not ready.');
        break;
      default:
        throw new Error('Unreachable');
    }

    context._state = newState;
  }

  markWaiting() {
    context.switchState(State.WAITING);
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
      setTimeout(this.markReady, 5000); // Time to heat up in milliseconds
      return true;
    } catch (err) {
      return false;
    }
  }


  brew(size, cb) {
    if (size === undefined) {
      cb(new Error('Missing size'));
      return;
    }
    if (!this.validateSize(size)) {
      cb(new Error('Invalid size'));
      return;
    }
    try {
      this.switchState(State.BREWING);
      context = this;
      setTimeout(this.markWaiting, 2500); // Time to brew
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
