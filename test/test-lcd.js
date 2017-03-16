const mockery = require('mockery');
const expect = require('chai').expect;
const mockLcd = require('./mock-jsupm_i2clcd.js');

describe('Testing lcd', () => {
  let lcd;

  before(() => {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerMock('jsupm_i2clcd', mockLcd);
  });

  after(() => {
    mockery.deregisterMock('jsupm_i2clcd');
    mockery.disable();
  });


  beforeEach(() => {
    lcd = require('../src/lcd.js'); // eslint-disable-line global-require
  });

  describe('#displayMessage(data)', () => {
    it('should write the message', (done) => {
      const testMessage = 'TestMessage';
      lcd.displayMessage({
        message: testMessage,
        red: 0,
        green: 0,
        blue: 0,
      });
      expect(testMessage).to.equal(mockLcd.locals.message);
      done();
    });
    it('should throw an error due to invalid colors.', (done) => {
      try {
        lcd.displayMessage({
          message: 'testMessage',
          red: -1,
          green: 256,
          blue: 300,
        });
        done('Error should have been thrown');
      } catch (err) {
        expect(err).to.be.an.error;
        done();
      }
    });
  });
});
