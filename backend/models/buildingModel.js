var mongoose = require('mongoose');
var utils = require("../utils/utils");
var Schema = mongoose.Schema;
var City = require('./cityModel'); //TODO use mongoose.model in each place
var BinSchema = require('./binModel').citySchema;
/**
 * Building are identify (client-side) by ._id
 */
var buildingSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'A name is required'
    },
    active: {
        type: Boolean,
        required: "active is required",
        default: true
    },
    address: {
        type: String,
        trim: true,
        required: 'An address is required'
    },
    floor: {
        type: Number
    },
    apartmentNumber: {
        type: Number
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'City'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

buildingSchema.statics.prepareUpdate = function(obj) {
    return utils.exclude(obj, 'members', 'owner');
}

buildingSchema.methods.isMember = function(user) {
    return this.members.find(member => utils.sameMongoId(member._id, user._id))
}

buildingSchema.methods.isOwner = function(user) {
    return utils.sameMongoId(this.owner._id, user._id)
}
buildingSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.active;
        return ret;
    },
}
buildingSchema.index({ members: 1})
module.exports = mongoose.model('Building', buildingSchema);