var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: 
var binCategorySchema = new Schema({
    name: {
        type: String,
        required: 'We need a name for bin category'
    }
});

module.exports = mongoose.model('BinCategory', binCategorySchema);