var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trashCategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'The name is required'
    },
    score: {
        type: Number,
        required: 'Score is required'
    }
});

module.exports = mongoose.model('TrashCategory', trashCategorySchema);