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

rewardSchema.methods.aboutScore = function() {
    return this.unlockData.type == "score"
}

rewardSchema.methods.aboutLevel = function() {
    return this.unlockData.type == "level"
}

rewardSchema.methods.aboutTrash = function() {
    return this.unlockData.type == "trash"
}

rewardSchema.methods.aboutTotalTrash = function() {
    return this.unlockData.type == "genericTrash"
}

module.exports = mongoose.model('Reward', rewardSchema);