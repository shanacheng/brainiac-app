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
      it('Returns user with username = jacknewuser', (done) => {
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

    describe('GraphQLGetPlatform', () => {
      it('Returns platform with PlatformID 37', (done) => {
          request(app).post('/graphql')
          .send({ query: ` query
          { getPlatform(platformID: 37) 
            { 
              name 
              description
              creatorName
              platformID
            } 
          }`})
          .expect(200)
          .end((err,res) => {
              platformData = res.body.data.getPlatform
              platformData.should.have.property('name');
              expect(platformData.name).to.equal('jacks platform');
              platformData.should.have.property('description');
              expect(platformData.description).to.equal('this is jacks platform');
              platformData.should.have.property('platformID');
              expect(platformData.platformID).to.equal(37);
              if (err) return done(err);
              done();
            })
       })
    });

    describe('GraphQLGetGame', () => {
      it('Returns game with GameID 57', (done) => {
          request(app).post('/graphql')
          .send({ query: `
          query {
            getGame(gameID: 57) {
              name
              description
              parentPlatform
            }
          }
          `})
          .expect(200)
          .end((err,res) => {
              gameData = res.body.data.getGame
              gameData.should.have.property('name');
              expect(gameData.name).to.equal('test game');
              gameData.should.have.property('description');
              expect(gameData.description).to.equal('this is a test game');
              gameData.should.have.property('parentPlatform');
              expect(gameData.parentPlatform).to.equal(37);
              if (err) return done(err);
              done();
            })
       })
    });