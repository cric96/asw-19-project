var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trashSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    trashCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrashCategory'
    },
    bin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bin'  
    }
});

module.exports = mongoose.model('Trash', trashSchema);