const mongoose = require('mongoose');
const Activity = mongoose.model("Activity",
    {
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