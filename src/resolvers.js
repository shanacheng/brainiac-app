const { Platform } = require("./models/Platform");
const {User} = require("./models/User");
const {Game} = require("./models/Game");
const { Activity } = require("./models/Activity");

const resolvers = {
    Query: {
        hello: () => "hello",
        async getUsers() {
            return await User.find({})
        },
        async getPlatforms() {
            return await Platform.find({})
        },
        async getUser(parent, args, context, info) {
            return await User.findOne({username: args.username});
        },
        async getPlatform(parent, args, context, info) {
            return await Platform.findOne({platformID: args.platformID});
        },
        async getGame(parent, args, context, info) {
            return await Game.findOne({gameID: args.gameID});
        }
    },
    Mutation: {
        createUser: (_, {name, username, email, password}) => {
            user = new User({
                name: name,
                username: username,
                email: email,
                password: password,
                profiiePicture: "",
                createdPlatforms: [],
                bookmarkedPlatforms: [],
                playedPlatforms: []
            });
            return user.save();
        },


        createPlatform: (_, {platformID, name, description, creatorName}) => {
            platform = new Platform({
                platformID: platformID,
                name: name, 
                description: description,
                creatorName: creatorName,
                games: [],
                private: true
            });
            User.findOneAndUpdate({username: creatorName},{"$push": {createdPlatforms: platformID}}, 
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return platform.save();
        },

        deletePlatform: (_, {username, platformID}) => {
            Platform.findOneAndDelete({platformID: platformID}, 
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            User.findOneAndUpdate({username: username}, {"$pull" : {createdPlatforms: platformID}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
        },

        bookmarkPlatform: (_, {username,platformID}) => {
            User.findOneAndUpdate({username: username}, {"$push": {bookmarkedPlatforms: platformID}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return platformID;
        },

        addPlayedPlatform: (_, {username,platformID}) => {
            User.findOneAndUpdate({username: username}, {"$push": {playedPlatforms: platformID}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return platformID;
        },

        saveChanges: (_, {email, name, username}) => {
            User.findOneAndUpdate({email: email}, {"$set" : {name: name, username: username}}, 
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return "";
        },

        confirmPasswordChange: (_, {password}) => {
            User.findOneAndUpdate({email: email}, {"$set" : {password: password}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return "";
        },

        createGame: (_, {gameID, name, description, creatorName, parentPlatform}) => {
            game = new Game({
                gameID: gameID,
                name: name,
                description: description, 
                activities: [],
                creatorName: creatorName,
                parentPlatform: parentPlatform,
                pictures: []
            });
            Platform.findOneAndUpdate({platformID: parentPlatform}, {"$push": {games: gameID}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return game.save();
        },

        deleteGame: (_, {platformID, gameID}) => {
            Game.findOneAndDelete({gameID: gameID}, 
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            Platform.findOneAndUpdate({platformID: platformID}, {"$pull" : {gameID: gameID}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
        },

        addActivity: (_, {activityID, type, gameID}) => {
            activity = new Activity({
                activityID: activityID, 
                type: type, 
                data: [],
                colors: ["white", "white", "white"],
                music: "", 
                time: 0
            });
            Game.findOneAndUpdate({gameID: gameID}, {"$push": {activities: activityID}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return activity.save();
        },

        addActivityCard: (_, {activityID, card1, card2, card3, card4, card5}) => {
            card = [card1, card2, card3, card4, card5];
            Activity.findOneAndUpdate({activityID: activityID}, {"$push": {data: card}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return card
        }
    }
}
const {db} = require('./testingQL');
exports.resolvers = resolvers