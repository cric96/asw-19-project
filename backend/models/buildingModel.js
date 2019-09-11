var mongoose = require('mongoose');
var utils = require("../utils/utils");
var Schema = mongoose.Schema;
var BinSchema = require('./binModel').schema;

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
    return utils.exclude(obj, 'members', 'owner', 'bins');
}
module.exports = mongoose.model('Building', buildingSchema);