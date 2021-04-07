const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        hello: String!
        users: [Users]!
    }
`;

exports.typeDefs = typeDefs;
