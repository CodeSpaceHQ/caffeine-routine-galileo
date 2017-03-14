const rewire = require('rewire');
const request = require('supertest');
const expect = require('chai').expect;


let message;
const mockLcd = {
  displayMessage: (msg) => {
    message = msg;
  },
};

describe('Testing express', () => {
  let server;
  message = undefined;

  beforeEach(() => {
    server = rewire('../src/index.js');
    server.__set__({
      lcd: mockLcd,
    });
  });

  afterEach(() => {
    server.close();
    message = undefined;
  });

  it('responds to /', (done) => {
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
          expect(message).to.equal(body.message);
          done();
        }
      });
  });
});
