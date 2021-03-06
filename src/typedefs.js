const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        hello: String!
        getUsers: [User]
        getPlatforms: [Platform]
        getUser(username: String!): User
        getPlatform(platformID: Int!): Platform
        getGame(gameID: Int!): Game
        getActivity(activityID: Int!): Activity
        filterPlatforms(name: String, creatorName: String, tags: [String]): [Platform]
    }

    type Mutation{
        createUser(
            name: String!
            username: String!
            email: String!
            password: String!
            ): User!
        login(
            email: String!
            password: String!
        ): User!
        createPlatform(
            name: String!
            description: String!
            creatorName: String!
            tags: [String]
            photo: String
            ): Platform!
        editPlatform(
            platformID: Int!
            name: String!
            description: String!
            creatorName: String!
            private: Boolean!
            tags: [String]
            photo: String!
        ): String
        deletePlatform(
            platformID:Int!
            username: String!
        ): String
        createGame(
            creatorName: String!
            parentPlatform: Int!
        ): Game!
        editGame(
            gameID: Int!
            parentPlatform: Int!
            creatorName: String!
            name: String!
            description: String!
            pictures: [String]
            # private: Boolean
            tags: [String]
        ): String
        deleteGame(
            platformID: Int!
            gameID: Int!
        ): String
        addActivity(
            type: String!
            gameID: Int!
            platformID: Int!
        ): Activity!
        bookmarkPlatform(
            username: String!
            platformID: Int!
        ): Int!
        editPlatformColors(
            platformID: Int!
            color1: String
            color2: String
        ): String
        unbookmarkPlatform(
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
            profilePicture: String
        ): String
        editColor(
            email: String!
            color: String
        ): String
        confirmPasswordChange(
            email: String!
            password: String
        ):String
        addActivityCard(
            activityID: Int!
            card1: String!
            card2: String!
            card3: String
            card4: String
            card5: String
            card6: String
        ):[String]
        addActivityColor(
            activityID: Int!
            color1: String
            color2: String
            color3: String
        ): String
        editMusic(
            activityID: Int!
            music: String
        ): String
        editTimer(
            activityID: Int!
            time: Int!
        ): String
        removeActivity(
            activityID: Int!
            gameID: Int!
        ): String
        removeActivityCard(
            activityID: Int!
            index: Int!
        ): String
        editActivityCard(
            activityID: Int!
            index: Int!
            card1: String
            card2: String
        ): String
    }

    type User{
        id: ID!
        username: String!
        name: String!
        email: String!
        token: String!
        password: String!
        profilePicture: String!
        badges: [String]
        createdPlatforms: [Int]
        bookmarkedPlatforms: [Int]
        playedPlatforms: [Int]
        color: String
    }

    type Platform{
        platformID: Int!
        name: String!
        description: String!
        creatorName: String!
        games: [Int]
        color1: String
        color2: String
        tags: [String],
        photo: String!
    }

    type Game{
        gameID: Int!
        name: String!
        description: String!
        activities: [Int]
        pictures: [String]
        parentPlatform: Int!
        creatorName: String!
        tags: [String]
        dateLastEdited: Int
    }

    type Activity{
        activityID: Int!
        parentPlatform: Int!
        parentGame: Int!
        type: String!
        data: [[String]]
        colors: [String]
        music: String!
        time: Int
    }
`;

exports.typeDefs = typeDefs;
