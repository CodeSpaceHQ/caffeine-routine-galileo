var rewire = require("rewire")
var request = require('supertest')

var mockLcd = {
  displayMessage: function(msg) {
    console.log('Displaying message: ', msg);
  }
}

//
// var mockLcd = {
//   Jhd1313m1: function(){
//     return {
//       setColor: function(red, gree, blue){
//         console.log("Setting color");
//       },
//       setCursor: function(x,y){
//         console.log('Setting cursor');
//       },
//       write: function(msg){
//         console.log('Writing message',msg);
//       }
//     }
//   }
// }


describe('Testing express', function() {
  var server
  beforeEach(function() {
    server = rewire('../src/index.js')
    server.__set__({
      lcd: mockLcd
    })
  })

  afterEach(function() {
    server.close()
  })

  it('responds to /', function(done) {
    request(server)
      .post('/')
      .expect(200, done)
  })



})
