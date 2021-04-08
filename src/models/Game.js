const mongoose = require('mongoose');
const Game = mongoose.model("Game",
    {
        gameID: Number,
        name: String,
        description: String,
        creatorName: String,
        activities: [Number],
        tags: [String],
        dateLastEdited: String,
        parentPlatform: Number,
        pictures: [String]
    }
);


exports.Game = Game;