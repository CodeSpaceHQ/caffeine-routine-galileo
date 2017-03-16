const expect = require('chai').expect;
const mockery = require('mockery');
const mockLcd = require('./mock-jsupm_i2clcd.js');

describe('Testing keurig', () => {
  let keurig;

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
    const Keurig = require('../src/keurig.js'); // eslint-disable-line global-require
    keurig = new Keurig();
  });

  afterEach(() => {
    keurig = undefined;
  });

  describe('#constructor()', () => {
    it('should be in waiting state.', (done) => {
      expect(keurig._state).to.equal(0);
      expect(mockLcd.locals.message).to.equal(keurig._messages.WAITING);
      done();
    });
  });

  describe('#markReady()', () => {
    it('should become ready', (done) => {
      keurig._state = 1;
      keurig.markReady();
      expect(mockLcd.locals.message).to.equal(keurig._messages.READY);
      expect(keurig._state).to.equal(2);
      done();
    });
  });

  describe('#heatUp()', () => {
    it('should start heating up', (done) => {
      const res = keurig.heatUp();
      expect(res).to.be.true;
      expect(mockLcd.locals.message).to.equal(keurig._messages.HEATING_UP);
      expect(keurig._state).to.equal(1);
      done();
    });

    it('should not heat up if not waiting.', (done) => {
      for (let state = 1; state < 4; state += 1) {
        keurig._state = state;
        const res = keurig.heatUp();
        expect(res).to.be.false;
      }
      done();
    });
  });

  describe('#brew()', () => {
    it('should brew', (done) => {
      keurig._state = 2; // Prepare keurig state to READY.
      keurig.brew('medium', done);
    });

    it('should throw due to invalid size', (done) => {
      keurig._state = 2;
      keurig.brew('invalidsize', (err) => {
        expect(err).to.be.an.error;
        done();
      });
    });

    it('should throw due to wrong state.', (done) => {
      keurig.brew('medium', (err) => {
        expect(err).to.be.an.error;
        done();
      });
    });
  });

  describe('#getSchedule()', () => {
    it('should return the schedule', (done) => {
      const schedule = ['mockDate1', 'mockDate2'];
      keurig.schedule = schedule;
      expect(keurig.getSchedule()).to.equal(schedule);
      done();
    });
  });

  describe('#setSchedule(schedule)', () => {
    it('should set the schedule', (done) => {
      const schedule = ['mockDate1', 'mockDate2'];
      keurig.setSchedule(schedule);
      expect(keurig.schedule).to.equal(schedule);
      done();
    });
  });

  describe('#validateSize(size)', () => {
    it('should validate correct sizes.', (done) => {
      const sizes = ['Small', 'Medium', 'Large'];
      sizes.forEach((size) => {
        expect(keurig.validateSize(size)).to.be.true;
        expect(keurig.validateSize(size.toLowerCase())).to.be.true;
        expect(keurig.validateSize(size.toUpperCase())).to.be.true;
      });
      done();
    });
  });
});
