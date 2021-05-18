const mongoose = require('mongoose');
const Platform = mongoose.model("Platform",
    {
        platformID: Number,
        name: String,
        description: String,
        creatorName: String,
        games: [Number],
        private: Boolean,
        photo: String,
        tags: [String]
    }
);


exports.Platform = Platform;