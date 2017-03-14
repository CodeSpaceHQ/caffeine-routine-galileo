const expect = require('chai').expect;
// const rewire = require('rewire');
const mockery = require('mockery');

let mockLcd = require('./jsupm_i2clcd-mock.js')


describe('Testing keurig', () => {
  let keurig;

  before(() => {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerMock('jsupm_i2clcd',mockLcd);
  });

  after(() => {
    mockery.deregisterMock('jsupm_i2clcd');
    mockery.disable();
  })

  beforeEach(() => {
    let Keurig = require('../src/keurig.js');
    keurig = new Keurig();
  });

  afterEach(() => {
    keurig = undefined;
  });

  it('should be in waiting state.', (done) => {
    expect(keurig._status).to.equal(0);
    expect(mockLcd.locals.message).to.equal(keurig._messages.WAITING);
    done();
  });

  it('should start heating up', (done) => {
    const res = keurig.heatUp();
    expect(res).to.be.true;
    expect(mockLcd.locals.message).to.equal(keurig._messages.HEATING_UP);
    expect(keurig._status).to.equal(1);
    done();
  });

  it('should not heat up if not waiting.', (done) => {
    for (let status = 1; status < 4; status += 1) {
      keurig._status = status;
      const res = keurig.heatUp();
      expect(res).to.be.false;
    }
    done();
  });
});
