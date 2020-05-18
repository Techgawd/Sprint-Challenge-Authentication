const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("auth-router", function () {
    
  describe("post /register", function () {
      beforeEach(async () => {
        await db("users").truncate(); 
      });
     
      it("return 404  on error", function () {
        return request(server)
          .post("/register")
          .send({ username: "newuser" })
          .then(res => {
            expect(res.status).toBe(404);
          });
      });
  
      it('should return a message saying "user registered"', function () {
        return request(server)
          .post("/api/auth/register")
          .send( {username: "newuser1", password: "newpass"} )
          .then(res => {
            expect(res.body.message).toBe('user registered!');
          });
      }); 
     

});
  describe('post /login', function() {
    it("return 401  on unsuccessful login", function () {
        return request(server)
          .post("/api/auth/login")
          .send({ username: "angela2"  })
          .then(res => {
            expect(res.status).toBe(401);
          });
      });  
      it('should return 200 on login', function () {
        return request(server)
          .post("/api/auth/login")
          .send( {username: "newuser1", password: 'newpass'} )
          .then(res => {
            expect(res.status).toBe(200);
          });
      }); 
})
})