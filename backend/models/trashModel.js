var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trashSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    trashCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrashCategory',
        required: true
    },
    bin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bin',
        required: true
    },
    building: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Building'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

trashSchema.index({ building: 1, user: 1, bin: 1 })
module.exports = mongoose.model('Trash', trashSchema);