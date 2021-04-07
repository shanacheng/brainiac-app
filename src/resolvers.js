const { Platform } = require("./models/Platform");
const {User} = require("./models/User");
const resolvers = {
    Query: {
        hello: () => "hello",
        getUsers: async() => {
            return await User.find({})
        },
        getPlatforms: async() => {
            return await Platform.find({})
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

        createPlatform: (_, {platformID, name, description, creatorName, games}) => {
            platform = new Platform({
                platformID: platformID,
                name: name, 
                description: description,
                creatorName: creatorName,
                games: games
            });
            // need to add update for user, need to do
            return platform.save();
        }
    }
}
const {db} = require('./testingQL');
exports.resolvers = resolvers