const express = require('express');
const mongoose = require('mongoose');
const {ApolloServer, gql} = require('apollo-server-express');
const {typeDefs} = require('./src/typedefs')
const {resolvers} = require('./src/resolvers')
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const {graphqlHTTP} = require("express-graphql");
const {User} = require("./src/models/User");

const app = express();
app.use(express.json())


const accountRoute = require('./src/pages/account');
const accountSettingsRoute = require('./src/pages/accountSettings');
const designRoute = require('./src/pages/design');
const exploreRoute = require('./src/pages/explore');
const gameRoute = require('./src/pages/game');
const homeRoute = require('./src/pages/home');


app.use('/account', accountRoute); 
app.use('/accountSettings', accountSettingsRoute); 
app.use('/design', designRoute);
app.use('/explore', exploreRoute);
app.use('/game', gameRoute);
app.use('/', homeRoute);

const userType = require('./src/graphql/UserType');
const rootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields:{
        getUser: {
            type: userType,
            args: {username: {type: GraphQLString }},
            resolve(parent, args) {//function to return data from db. I believe it is this?????
                return User.findOne({username: args.username}); 
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: userType,
            args: {
                name: {type: GraphQLString},
                username: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                createdPlatforms: {type: GraphQLList(GraphQLInt)},
                bookmarkedPlatforms: {type: GraphQLList(GraphQLInt)},
                playedPlatforms: {type: GraphQLList(GraphQLInt)}
            },
            resolve(parent, args){
                return User.save();
            }
        }
    }
});

const schema = new GraphQLSchema({query: rootQuery, mutation: Mutation});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const server = new ApolloServer({
    typeDefs, 
    resolvers
})


server.applyMiddleware({app});

//database
const database = require('./config/keys').mongoURI;
const { resolve } = require('path');

//connect 
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

    //deploy to heroku (env.port)
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server listening at http://localhost:5000${server.graphqlPath}`));
