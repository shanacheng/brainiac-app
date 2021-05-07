const { Platform } = require("./models/Platform");
const {User} = require("./models/User");
const {Game} = require("./models/Game");
const { Activity } = require("./models/Activity");
const { SECRET_KEY } = require("../config/keys");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

function generateToken(user) {
    return jwt.sign({
        username: user.username,
        email: user.email,
        name: user.name
    }, SECRET_KEY, { 
        expiresIn: '1h'
    })
}

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
        },
        async getActivity(parent, args, context, info) {
            return await Activity.findOne({activityID: args.activityID});
        },
        async filterPlatforms(parent, args, context, info) {
            return await Platform.find({name: args.name, creatorName: args.creatorName, tags: args.tags, private: false})
        }
    },
    Mutation: {
        async createUser(_, {name, username, email, password}){
            const newPassword = await bcrypt.hash(password, 12);
            user = new User({
                name: name,
                username: username,
                email: email,
                password: newPassword,
                profilePicture: "",
                badges: [],
                createdPlatforms: [],
                bookmarkedPlatforms: [],
                playedPlatforms: []
            });
            const res = await user.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                name,
                username,
                token
            }
        },

        async login(_, {email, password}) {
            console.log(email);
            const user  = await User.findOne({email});
            console.log(user);
            const token = generateToken(user);
            const match = await bcrypt.compare(password, user.password);
            return {
                ...user._doc,
                // username,
                token
            }
        },


        createPlatform: (_, {name, description, creatorName}) => {
            console.log("hit platform create method")
            var platformID;
            while (true) {
                platformID = Math.floor(Math.random() * 100000000);
                console.log(platformID);
                if (Platform.findOne({platformID: platformID}).data == null)
                break
            }
            platform = new Platform({
                platformID: platformID,
                name: name, 
                description: description,
                creatorName: creatorName,
                games: [],
                private: true,
                tags: []
            });
            User.findOneAndUpdate({username: creatorName},{"$push": {createdPlatforms: platformID}}, 
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return platform.save();
        },

        editPlatform: (_, {platformID, name, description, creatorName, private, tags}) => {
            Platform.findOneAndUpdate({platformID: platformID, creatorName: creatorName}, {"$set" : {name: name, description: description, private: private, tags: tags}}, 
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return "";
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

        async bookmarkPlatform(_, {username,platformID}){
            const user = await User.findOne({username: username});
            if (user.bookmarkedPlatforms.includes(platformID) == false){
                User.findOneAndUpdate({username: username}, {"$push": {bookmarkedPlatforms: platformID}},
                function(error, success) {
                    if (error) {console.log(error)}
                    else {console.log(success)}
                });
            }
            return platformID;
        },

        async unbookmarkPlatform(_, {username,platformID}){
            const user = await User.findOne({username: username});
            if (user.bookmarkedPlatforms.includes(platformID) == true){
                User.findOneAndUpdate({username: username}, {"$pull": {bookmarkedPlatforms: platformID}},
                function(error, success) {
                    if (error) {console.log(error)}
                    else {console.log(success)}
                });
            }
            return platformID;
        },

        async addPlayedPlatform(_, {username,platformID}){
            const user = await User.findOne({username: username});
            if (user.playedPlatforms.includes(platformID) == false) {
                User.findOneAndUpdate({username: username}, {"$push": {playedPlatforms: platformID}},
                function(error, success) {
                    if (error) {console.log(error)}
                    else {console.log(success)}
                });
            }
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

        createGame: (_, {creatorName, parentPlatform}) => {
            var gameID;
            while (true) {
                gameID = Math.floor(Math.random() * 100000000);
                console.log(gameID);
                if (Game.findOne({gameID: gameID}).data == null)
                break
            }
            game = new Game({
                gameID: gameID,
                name: "",
                description: "", 
                activities: [],
                creatorName: creatorName,
                parentPlatform: parentPlatform,
                pictures: [],
                tags: []
            });
            Platform.findOneAndUpdate({platformID: parentPlatform}, {"$push": {games: gameID}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return game.save();
        },

        editGame: (_, {gameID, parentPlatform, name, description, creatorName, tags}) => {
           Game.findOneAndUpdate({gameID: gameID, parentPlatform: parentPlatform, creatorName: creatorName}, {"$set" : {name: name, description: description, tags: tags}}, 
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return "";
        },

        deleteGame: (_, {platformID, gameID}) => {
            Game.findOneAndDelete({gameID: gameID}, 
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            Platform.findOneAndUpdate({platformID: platformID}, {"$pull" : {games: gameID}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
        },

        addActivity: (_, {type, gameID}) => {
            while (true) {
                activityID = Math.floor(Math.random() * 100000000);
                console.log(gameID);
                if (Activity.findOne({activityID: activityID}).data == null)
                break
            }
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

        addActivityCard: (_, {activityID, card1, card2, card3, card4, card5, card6}) => {
            card = [card1, card2, card3, card4, card5, card6];
            Activity.findOneAndUpdate({activityID: activityID}, {"$push": {data: card}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            return card
        },

        addActivityColor: (_, {activityID, color1, color2, color3}) => {
            colors = [color1, color2, color3];
            Activity.findOneAndUpdate({activityID: activityID}, {"$set": {colors: colors}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
        },

        editMusic: (_, {activityID, music}) => {
            Activity.findOneAndUpdate({activityID: activityID}, {"$xset": {music: music}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
        },

        // editTime: (_, {activityID, time}) =>{
        //     Activity.findOneAndUpdate({activityID: activityID}, {"$set": {time: time}},
        //     function(error, success) {
        //         if (error) {console.log(error)}
        //         else {console.log(success)}
        //     });
        // },

        removeActivity: (_, {activityID, gameID}) => {
            Activity.findOneAndDelete({activityID: activityID}, 
                function(error, success) {
                    if (error) {console.log(error)}
                    else {console.log(success)}
                });
            Game.findOneAndUpdate({platformID: platformID}, {"$pull" : {gameID: gameID}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
        },

        removeActivityCard: (_, {activityID, index}) => {
            activityIndex = "data." + index.toString();
            console.log(activityIndex);
            Activity.findOneAndUpdate({activityID: activityID}, {"$unset": {activityIndex: index}},
                function(error, success) {
                    if (error) {console.log(error)}
                    else {console.log(success)}
                });
            Activity.findOneAndUpdate({activityID: activityID}, {"$pull": {data: null}},
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
        },

        editActivityCard: (_, {activityID, index, card1, card2}) => {

        }

    }
}
const {db} = require('./testingQL');
exports.resolvers = resolvers