var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'The name is required'
    },
    state: {
        type: String,
        trim: true,
        required: 'The state is required'
    },
    binCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BinCategory'
    }]
});

module.exports = mongoose.model('City', citySchema);