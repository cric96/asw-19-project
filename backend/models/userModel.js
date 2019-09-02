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
        default: null
    },
    surname: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        match: regex.email,
        required: 'We need an email',
        unique: true,
        immutable: true
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
        default: null
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
        delete ret._id;
        return ret;
    },
}

module.exports = mongoose.model('User', userSchema);