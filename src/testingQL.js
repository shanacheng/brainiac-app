const {ApolloServer} = require('apollo-server-express');
const {typeDefs} = require('./typedefs');
const {resolvers} = require('./resolvers');
const {MongoClient} = require('mongodb').MongoClient;
const uri = require('./../config/keys').mongoURI;
let db;
const testserver = new ApolloServer({
    typeDefs,
    resolvers,
    context: async() =>{
        if(!db){
            try{
                const testclient = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true })
                if(!testclient.isConnected()){
                    await testclient.connect();
                }
                db = testclient.db('BrainiacData');
            }catch(e){
                console.log('Error connecting to MongoDB: ');
                console.log(e);
            }
        }
        return {db};
    }
})
exports.db = db; 