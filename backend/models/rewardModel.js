var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var regex = require("../utils/regex")

var rewardSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'We need a name for the reward'
    },
    picture: {
        type: String,
        match: regex.url,
        required: 'We need a picture for the reward'
    },
    description: {
        type: String,
        trim: true,
        required: 'We need a description for the reward'
    },
    availableAtLevel: {
        type: Number,
        required: 'You must specify the level to unlock it'
    },
    video: {
        type: String,
        match: regex.url
    }
});

module.exports = mongoose.model('Reward', rewardSchema);