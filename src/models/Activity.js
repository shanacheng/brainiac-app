const mongoose = require('mongoose');
const Activity = mongoose.model("Activity",
    {
        parentPlatform: Number,
        activityID: Number,
        parentGame: Number,
        type: String,
        data: [[String]],
        colors: [String],
        music: String,
        time: Number
    }
);


exports.Activity = Activity;