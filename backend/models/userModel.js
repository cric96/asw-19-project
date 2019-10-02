var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var utils = require("../utils/utils");
var regex = require("../utils/regex");
/**
 * User schema: user are identify (client-side) with firebase uid
 */
var userSchema = new Schema({
    firebase_uid: {
        type: String,
        required: true,
        unique: true,
        index: true
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
        immutable: true,
        index: true
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
        unique: true,
        index: true,
        sparse: true
    },
    rewards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward'
    }]
});

/*
    virtual properties are used to create a virtual attribute not directly stored
    in mongodb, but computed when its value is requested.
*/
userSchema.virtual.nameId = function(obj) {
    return (this.nickname != null) ? this.nickname : this.email;
}
/*
    static propierty is like static method in Java, add method on userSchema, not on the
    object.
 */
userSchema.statics.prepareUpdate = function(obj) {
    return utils.exclude(obj, 'email', 'level', 'score');
}

userSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        // can i do? delete ret._id;
        return ret;
    },
}

module.exports = mongoose.model('User', userSchema);