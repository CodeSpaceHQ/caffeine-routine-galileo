const expect = require('chai').expect;
const rewire = require('rewire');

describe('Testing keurig', () => {
  const Keurig = rewire('../src/keurig.js');
  let keurig;
  let message;

  const mockLcd = {
    displayMessage: (msg) => {
      message = msg;
    },
  };

  Keurig.__set__({
    lcd: mockLcd,
  });

  beforeEach(() => {
    keurig = new Keurig();
  });

  afterEach(() => {
    keurig = undefined;
    message = undefined;
  });

  it('should be in waiting state.', (done) => {
    expect(keurig._status).to.equal(0);
    done();
  });

  it('should start heating up', (done) => {
    const res = keurig.heatUp();
    expect(res).to.be.true;
    expect(message).to.equal(keurig._messages.HEATING_UP);
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
