var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var binSchema = new Schema({
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    },
    binCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BinCategory'
    },
    trash: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trash'
    }]
});

module.exports = mongoose.model('Bin', binSchema);