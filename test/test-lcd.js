const mockery = require('mockery');
const expect = require('chai').expect;
const mockLcd = require('./jsupm_i2clcd-mock.js');

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
    lcd.displayMessage(testMessage);
    expect(testMessage).to.equal(mockLcd.locals.message);
    done();
  });
});
