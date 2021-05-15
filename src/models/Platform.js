const mongoose = require('mongoose');
const Platform = mongoose.model("Platform",
    {
        platformID: Number,
        name: String,
        description: String,
        creatorName: String,
        games: [Number],
        private: Boolean,
        photo: String
    }
);


exports.Platform = Platform;