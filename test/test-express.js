const request = require('supertest');
const expect = require('chai').expect;
const mockery = require('mockery');

let mockLcd = require('./jsupm_i2clcd-mock.js')


let status = 0;


describe('Testing express', () => {
  let server;

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
    server = require('../src/index.js');
  });

  afterEach(() => {
    server.close();
    status = 0;
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
        //console.log(res);
        done(err);
      });
  })
});
