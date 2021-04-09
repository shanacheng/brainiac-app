const request = require("supertest");
const app = require("../index");
const chai = require('chai');
const expect = chai.expect;
var should = chai.should()


    describe("GET /", () => {
      it("respond with Hello World", (done) => {
        request(app).get("/").expect("Hello World", done);
      })
    });

    describe('GraphQLGetUser', () => {
      it('Returns user with username = "jacknewuser', (done) => {
          request(app).post('/graphql')
          .send({ query: ` query
          { getUser(username: "jacknewuser") 
            { name 
              username 
              email 
            } 
          }`})
          .expect(200)
          .end((err,res) => {
              res.body.data.getUser.should.have.property('name');
              expect(res.body.data.getUser.name).to.equal('JACK');
              res.body.data.getUser.should.have.property('username');
              expect(res.body.data.getUser.username).to.equal('jacknewuser');
              res.body.data.getUser.should.have.property('email');
              expect(res.body.data.getUser.email).to.equal('jack123@gmail.com');
              if (err) return done(err);
              done();
            })
       })
    });