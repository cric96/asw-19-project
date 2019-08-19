var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var utils = require("../utils/utils");
var regex = require("../utils/regex");

var userSchema = new Schema({
    firebase_uid: {
        type: String,
        required: true,
        unique: true
    },
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

userSchema.methods.prepareUpdate = utils.exclude(this, 'email', 'level', 'score');

userSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.firebase_uid;
        return ret;
    }
}

module.exports = mongoose.model('User', userSchema);