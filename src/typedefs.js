const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        hello: String!
        users: [Users]!
    }
    type Mutation{
        createUser(
            name: String!
            username: String!
            email: String!
            password: String!
            ): User!
    }
    type User{
        id: ID!
        username: String!
        name: String!
        email: String!
        password: String!
        profilePicture: String!
        badges: [String]
        createdPlatforms: [Int]
        bookmarkedPlatforms: [Int]
        playedPlatforms: [Int]
    }
`;

exports.typeDefs = typeDefs;
