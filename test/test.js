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

    // describe('GraphQLCreateUser', () => {
    //     it('Returns newly created User', (done) => {
    //         request(app).post('/graphql')
    //         .send({ query: ` mutation{
    //             createUser(name:"john", username: "john123", email: "johnsemail@gmail.com", password: "johnspassword") {
    //               name
    //               user
    //               email
    //             }
    //           }`})
    //         .expect(200)
    //         .end((err,res) => {
    //             userData = res.body.data.createUser
    //             userData.should.have.property('name');
    //             expect(userData.creatorName).to.equal('john');
    //             userData.should.have.property('usernamename');
    //             expect(userData.name).to.equal('john123');
    //             userData.should.have.property('email');
    //             expect(userData.description).to.equal('johnsemail@gmail.com');
    //             if (err) return done(err);
    //             done();
    //           })
    //      })
    //   });

    describe('GraphQLGetActivity', () => {
        it('Returns activity with activityID 25', (done) => {
            request(app).post('/graphql')
            .send({ query: `
            query {
                getActivity(activityID: 25) {
                  activityID
                  type
                  colors
                }
              }
            `})
            .expect(200)
            .end((err,res) => {
                gameData = res.body.data.getActivity
                gameData.should.have.property('activityID');
                expect(gameData.activityID).to.equal(25);
                gameData.should.have.property('type');
                expect(gameData.type).to.equal('Flashcards');
                gameData.should.have.property('colors');
                expect(gameData.colors).to.deep.equal([ 'white', 'white', 'white' ]);
                if (err) return done(err);
                done();
              })
         })
      });

      describe('GraphQLCreatePlatform', () => {
        it('Returns newly created platform', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation{
                createPlatform(creatorName:"john123", name: "johns first platform", platformID:67, description: "this is johns first platform") {
                  creatorName
                  name
                  description
                  platformID
                }
              }`})
            .expect(200)
            .end((err,res) => {
                platformData = res.body.data.createPlatform
                platformData.should.have.property('creatorName');
                expect(platformData.creatorName).to.equal('john123');
                platformData.should.have.property('name');
                expect(platformData.name).to.equal('johns first platform');
                platformData.should.have.property('description');
                expect(platformData.description).to.equal('this is johns first platform');
                platformData.should.have.property('platformID');
                expect(platformData.platformID).to.equal(67);
                if (err) return done(err);
                done();
              })
         })
      });

      describe('GraphQLBookmarkPlatform', () => {
        it('Returns platformID of bookmarked platform', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation {
                bookmarkPlatform(username: "john123", platformID: 67)
              }`})
            .expect(200)
            .end((err,res) => {
                platformData = res.body.data.bookmarkPlatform;
                expect(platformData).to.equal(67);
                if (err) return done(err);
                done();
              })
         })
      });

      describe('GraphQLAddPlayedPlatform', () => {
        it('Returns played platforms platformID', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation {
                addPlayedPlatform(username: "john123", platformID: 67)
              }`})
            .expect(200)
            .end((err,res) => {
                platformData = res.body.data.addPlayedPlatform;
                expect(platformData).to.equal(67);
                if (err) return done(err);
                done();
              })
         })
      });

      describe('GraphQLCreateGame', () => {
        it('Returns newly created game', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation{
                createGame(gameID: 711, description: "johns first game", name: "johns game", parentPlatform: 67, creatorName: "john123") {
                  name
                  parentPlatform
                  description
                  creatorName
                }
              }`})
            .expect(200)
            .end((err,res) => {
                gameData = res.body.data.createGame
                gameData.should.have.property('creatorName');
                expect(gameData.creatorName).to.equal('john123');
                gameData.should.have.property('name');
                expect(gameData.name).to.equal('johns game');
                gameData.should.have.property('description');
                expect(gameData.description).to.equal('johns first game');
                gameData.should.have.property('parentPlatform');
                expect(gameData.parentPlatform).to.equal(67);
                if (err) return done(err);
                done();
              })
         })
      });

      describe('GraphQLAddActivity', () => {
        it('Returns added activity', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation{
                addActivity(activityID: 1231, type: "matching", gameID: 711) {
                  activityID
                  type
                }
              }`})
            .expect(200)
            .end((err,res) => {
                activityData = res.body.data.addActivity;
                activityData.should.have.property('activityID');
                expect(activityData.activityID).to.equal(1231);
                activityData.should.have.property('type');
                expect(activityData.type).to.equal('matching');
                if (err) return done(err);
                done();
              })
         })
      });

      describe('GraphQLAddActivityCard', () => {
        it('Returns added activity card', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation{
                addActivityCard(activityID:1231, card1:"hi", card2: "bye")
              }`})
            .expect(200)
            .end((err,res) => {
                activityData = res.body.data.addActivityCard;
                expect(activityData).to.deep.equal(["hi","bye",null,null,null]);
                if (err) return done(err);
                done();
              })
         })
      });

    //   describe('GraphQLEditPlatform', () => {
    //     it('Shows working functionality of editPlatform', (done) => {
    //         request(app).post('/graphql')
    //         .send({ query: ` mutation{
    //             editPlatform(platformID:37, creatorName: "jacknewuser", name: "jack new platform name", description: "jacks new platform description", private: false)
    //           }`})
    //         .expect(200)
    //         .end((err,res) => {
    //             if (err) return done(err);
    //             done();
    //           })
    //      })
    //   });

      describe('GraphQLDeletePlatform', () => {
        it('Shows working functionality of deletePlatform', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation{
                deletePlatform(platformID: 67, username: "john123")
              }`})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                done();
              })
         })
      });

      describe('GraphQLSaveChanges', () => {
        it('Shows working functionality of saveChanges', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation{
                saveChanges(email: "johnsemail@gmail.com", username: "johnsnewuser", name: "john john")
               }`})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                done();
              })
         })
      });

      describe('GraphQLAddActivityColor', () => {
        it('Shows working functionality of addActivityColor', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation{
                addActivityColor (activityID: 1231, color1: "red", color2: "blue", color3: "black")
              }`})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                done();
              })
         })
      });
    
      describe('GraphQLEditMusic', () => {
        it('Shows working functionality of editMusic', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation{
                editMusic(activityID: 1231, music: "yoyoyo")
              }`})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                done();
              })
         })
      });

      describe('GraphQLRemoveActivity', () => {
        it('Shows working functionality of removeActivity', (done) => {
            request(app).post('/graphql')
            .send({ query: ` mutation{
                removeActivity(activityID: 1231, gameID: 711)
              }`})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                done();
              })
         })
      });