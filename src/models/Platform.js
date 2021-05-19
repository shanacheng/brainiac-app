const mongoose = require('mongoose');
const Platform = mongoose.model("Platform",
    {
        platformID: Number,
        name: String,
        description: String,
        creatorName: String,
        games: [Number],
        private: Boolean,
        color1: String,
        color2: String
    }
);


exports.Platform = Platform;