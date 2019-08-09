var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var binCategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'We need a name for bin category'
    },
    colour: {
        type: String,
        trim: true,
        required: 'We need a colour for bin category'
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    trashCategories: [{type: mongoose.Schema.Types.ObjectId, ref: 'TrashCategory'}]
});

module.exports = mongoose.model('BinCategory', binCategorySchema);