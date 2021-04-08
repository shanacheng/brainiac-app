const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        hello: String!
        getUsers: [User]
        getPlatforms: [Platform]
        getUser(username: String!): User
        getPlatform(platformID: Int!): Platform
    }

    type Mutation{
        createUser(
            name: String!
            username: String!
            email: String!
            password: String!
            ): User!
        createPlatform(
            platformID: Int!
            name: String!
            description: String!
            creatorName: String!
            games: [Int]
            ): Platform!
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

    type Platform{
        platformID: Int!
        name: String!
        description: String!
        creatorName: String!
        games: [Int]
    }

    type Game{
        gameID: Int!
        name: String!
        description: String!
        activities: [Activity]
        tags: [String]
        dateLastEdited: Int
    }

    type Activity{
        type: String!
        data: [[String]]
        colors: [String]
        music: String!
        time: Int
    }
`;

exports.typeDefs = typeDefs;
