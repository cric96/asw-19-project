var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var binSchema = new Schema({
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
module.exports.schema = binSchema;