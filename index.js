const express = require('express');
const mongoose = require('mongoose');
const {ApolloServer, gql} = require('apollo-server-express');
const {typeDefs} = require('./src/typedefs')
// const {resolvers} = require('./src/resolvers')

resolvers = {}
const app = express();
app.use(express.json())

const server = new ApolloServer({
    typeDefs, 
    resolvers
})

server.applyMiddleware({app});

//database
const database = require('./config/keys').mongoURI;

//connect 
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

    //deploy to heroku (env.port)
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server listening at http://localhost:5000${server.graphqlPath}`));
