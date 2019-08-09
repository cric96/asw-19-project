var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var regex = require("../utils/regex");

var userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'A name is required'
    },
    surname: {
        type: String,
        trim: true,
        required: 'A surname is required'
    },
    email: {
        type: String,
        match: regex.email,
        required: 'We need an email'
    },
    level: {
        type: Number,
        default: 1
    },
    score: {
        type: Number,
        default: 0
    },
    nickname: {
        type: String,
        trim: true,
        required: 'A nickname is required'
    },
    rewards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward'
    }],
    buildings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    }],
    trash: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trash'
    }]
});

module.exports = mongoose.model('User', userSchema);