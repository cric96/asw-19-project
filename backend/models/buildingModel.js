var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildingSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'A name is required'
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
        ref: 'City'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bin'
    }]
});

module.exports = mongoose.model('Building', buildingSchema);