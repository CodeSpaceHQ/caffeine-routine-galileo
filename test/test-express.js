const request = require('supertest');
const expect = require('chai').expect;
const mockery = require('mockery');
const mockLcd = require('./mock-jsupm_i2clcd.js');
const mockKeurig = require('./mock-keurig.js');

describe('Testing express', () => {
  let server;

  before(() => {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerMock('jsupm_i2clcd', mockLcd);
    mockery.registerMock('./keurig.js', mockKeurig);
  });

  after(() => {
    mockery.deregisterMock('jsupm_i2clcd');
    mockery.deregisterMock('./keurig.js');
    mockery.disable();
  });

  beforeEach(() => {
    server = require('../src/index.js'); // eslint-disable-line global-require
  });

  afterEach(() => {
    server.close();
  });

  it('should display any message', (done) => {
    const body = {
      message: 'TestMessage',
    };
    request(server)
      .post('/')
      .send(body)
      .type('form')
      .expect(200, (err) => {
        if (err) done(err);
        else {
          expect(body.message).to.equal(mockLcd.locals.message);
          done();
        }
      });
  });

  it('should start heating up', (done) => {
    request(server)
      .post('/heat')
      .expect(200)
      .end((err) => {
        expect(mockKeurig.locals.heatingUp).to.be.true;
        done(err);
      });
  });

  it('should start brewing', (done) => {
    const body = {
      size: 'small',
    };
    request(server)
      .post('/brew')
      .send(body)
      .type('form')
      .expect(200)
      .end((err, res) => {
        expect(mockKeurig.locals.brewing).to.be.true;
        expect(res.text).to.equal('Brewing');
        done(err);
      });
  });

  it('should not brew, returning an error', (done) => {
    const body = {
      size: 'small',
    };
    const mockCb = new Error('MockError');
    mockKeurig.locals.cb.brew = mockCb;
    request(server)
      .post('/brew')
      .send(body)
      .type('form')
      .expect(400)
      .end((err, res) => {
        expect(mockKeurig.locals.brewing).to.be.true;
        expect(res.text).to.equal('MockError');
        done(err);
      });
  });
});
