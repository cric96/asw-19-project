var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rewardSchema = new Schema({
    name: {
        type: String,
        required: 'We need a name for the reward'
    },
    picture: {
        type: String,
        // TODO: validate as URL, use match with Regex
        required: 'We need a picture for the reward'
    },
    description: {
        type: String,
        required: 'We need a description for the reward'
    },
    availableAtLevel: {
        type: Number,
        required: 'You must specify the level to unlock it'
    },
    eventType: {
        type: String,
        // TODO: use enum?
    },
    conditions: {
        type: Map,
        of: String
    },
    video: {
        type: String
        // TODO: validate as URL, use match with Regex
    }
});

module.exports = mongoose.model('Reward', rewardSchema);