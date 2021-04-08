const { Platform } = require("./models/Platform");
const {User} = require("./models/User");
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
        }
    },
    Mutation: {
        createUser: (_, {name, username, email, password}) => {
            user = new User({
                name: name,
                username: username,
                email: email,
                password: password,
                profilePicture: "",
                createdPlatforms: [],
                bookmarkedPlatforms: [],
                playedPlatforms: []
            });
            return user.save();
        },

        createPlatform: (_, {platformID, name, description, creatorName, games}) => {
            platform = new Platform({
                platformID: platformID,
                name: name, 
                description: description,
                creatorName: creatorName,
                games: games
            });
            // need to add update for user, need to do
            // user = User.findOne({username: creatorName});
            // user.createdPlatforms.push(platformID);
            // user.save();
            User.findOneAndUpdate({username: creatorName},{"$push": {createdPlatforms: platformID}}, 
            function(error, success) {
                if (error) {console.log(error)}
                else {console.log(success)}
            });
            // User.findOneAndUpdate({username: creatorName}, {"$push": {"createdPlatforms": platformID}}, done);
            return platform.save();
        },
    }
}
const {db} = require('./testingQL');
exports.resolvers = resolvers