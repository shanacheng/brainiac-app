const { Platform } = require("./../models/Platform");

const resolvers = {
    Mutation: {
        createPlatform: (_, {platformID, name, description, creatorName, games}) => {
            platform = new Platform({
                platformID: platformID,
                name: name, 
                description: description,
                creatorName: creatorName,
                games: games
            });
            // need to add update for user, need to do research on how to do that
            return platform.save();
        }
    }
}

exports.platformResolvers = resolvers