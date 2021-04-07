const {db} = require('./testingQL');

const resolvers = {
    Query: {
        hello: () => {
            return "hello";
        },
        users: async() => {
            let Users = await db.collection('Users');
            return Users;
        }
    }
}

exports.resolvers = resolvers;