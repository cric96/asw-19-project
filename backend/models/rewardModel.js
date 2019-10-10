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
    },
    /**
     * unlock data are a set of metadata used to tell
     * when a rewards could be unlock by an user.
     * The object must have type attribute
     */
    unlockData: {
        type: Object,
        required: 'You must specify the data to unlock the reward'
    }
});


module.exports = mongoose.model('Reward', rewardSchema);