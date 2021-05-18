const mongoose = require('mongoose');
const User = mongoose.model("User", 
    {name: String,
    username: String, 
    email: String,
    password: String,
    profilePicture: String,
    badges: [String],
    createdPlatforms: [Number],
    bookmarkedPlatforms: [Number],
    playedPlatforms: [Number],
    color: String
    }
);


exports.User = User;