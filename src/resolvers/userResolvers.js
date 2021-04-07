const {User} = require("./../models/User");

const resolvers = {
    Mutation:{
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
    }
}

exports.userResolvers = resolvers