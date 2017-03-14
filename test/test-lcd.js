const rewire = require('rewire');
const expect = require('chai').expect;
/*
Note: eslint-disable-line no-unused-vars
is used to let mocking happen
*/

let messageResult;

const mockLcd = {
  // Requires this eslint expection to work with IoT
  // eslint-disable-next-line object-shorthand, no-unused-vars, func-names
  Jhd1313m1: function (a, b, c) {
    return {
      setColor: (red, gree, blue) => { // eslint-disable-line no-unused-vars
      },
      setCursor: (x, y) => { // eslint-disable-line no-unused-vars
      },
      write: (msg) => {
        messageResult = msg;
      },
    };
  },
};

describe('Testing lcd', () => {
  let lcd;
  beforeEach(() => {
    lcd = rewire('../src/lcd.js');
    lcd.__set__({
      lcd: mockLcd,
    });
  });

  it('should write the message', (done) => {
    const testMessage = 'TestMessage';
    lcd.displayMessage(testMessage);
    expect(testMessage).to.equal(messageResult);
    done();
  });
});
