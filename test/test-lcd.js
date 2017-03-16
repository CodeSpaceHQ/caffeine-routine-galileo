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
});
