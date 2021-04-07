const {User} = require("./models/User");
const resolvers = {
    Query: {
        hello: () => "hello"
    },
    Mutation: {
        createUser: (_, {name, username, email, password}) => {
            user = new User({
                name: name,
                username: username,
                email: email,
                password: password
            });
            return user.save();
        }
    }
}

exports.resolvers = resolvers;