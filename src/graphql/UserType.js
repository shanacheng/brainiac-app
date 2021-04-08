const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString} = graphql;
const UserType = new GraphQLObjectType({
    name: "Users",
    fields: () => ({
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        profilepicture: {type: GraphQLString},
        badges: {type: GraphQLList(GraphQLString)},
        createdPlatforms: {type: GraphQLList(GraphQLInt)},
        bookmarkedPlatforms: {type: GraphQLList(GraphQLInt)},
        playedPlatforms: {type: GraphQLList(GraphQLInt)}
    })
});

module.exports = UserType;