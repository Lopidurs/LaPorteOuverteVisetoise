var request = require('supertest');
const  app = require("../index");

describe('Testing for the /games routes', function() {

    it('Should be able to join /API/games', function (done) {
        request(app)
            .get('/API/games')
            .expect(200, done)
    })  
  });
