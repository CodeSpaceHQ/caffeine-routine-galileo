const request = require('supertest');
const expect = require('chai').expect;
const mockery = require('mockery');
const mockLcd = require('./jsupm_i2clcd-mock.js');

describe('Testing express', () => {
  let server;

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
      .end((err, res) => {
        expect(res.text).to.equal('Heating up');
        done(err);
      });
  });
});
