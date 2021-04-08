const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        hello: String!
        getUsers: [User]
        getPlatforms: [Platform]
        getUser(username: String!): User
        getPlatform(platformID: Int!): Platform
        getGame(gameID: Int!): Game
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
        deletePlatform(
            platformID:Int!
            username: String!
        ): String
        createGame(
            gameID: Int!
            name: String!
            description: String!
            creatorName: String!
            parentPlatform: Int!
        ): Game!
        deleteGame(
            platformID: Int!
            gameID: Int!
        ): String
        addActivity(
            activityID: Int!
            type: String!
            gameID: Int!
        ): Activity!
        bookmarkPlatform(
            username: String!
            platformID: Int!
        ): Int!
        addPlayedPlatform(
            username: String!
            platformID: Int!
        ): Int!
        saveChanges(
            email: String!
            username: String
            name: String
        ): String
        confirmPasswordChange(
            password: String
        ):String
        addActivityCard(
            activityID: Int!
            card1: String!
            card2: String!
            card3: String
            card4: String
            card5: String
        ):[String]
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
        creatorName: String!
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
