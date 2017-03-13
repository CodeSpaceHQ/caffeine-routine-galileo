var rewire = require("rewire")
var request = require('supertest')
var expect = require("chai").expect;
var message
var mockLcd = {
  displayMessage: function(msg) {
    message = msg
  }
}

describe('Testing express', function() {
  var server
  message = undefined

  beforeEach(function() {
    server = rewire('../src/index.js')
    server.__set__({
      lcd: mockLcd
    })
  })

  afterEach(function() {
    server.close()
    message = undefined
  })

  it('responds to /', function(done) {
    var body = {
      message: "TestMessage"
    }
    request(server)
      .post('/')
      .send(body)
      .type('form')
      .expect(200, function(err) {
        if(err) done(err)
        else {
          expect(message).to.equal(body.message)
          done()
        }
      })
  })



})
