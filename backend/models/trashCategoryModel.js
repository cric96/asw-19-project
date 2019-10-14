var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var regex = require("../utils/regex")
var utils = require("../utils/utils")

var trashCategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: 'The name is required'
    },
    score: {
        type: Number,
        required: 'Score is required'
    },
    image: {
        type: String,
        required: true,
        match: regex.url
    }
});
trashCategorySchema.options.toJSON = {
    transform: function(doc, ret, options) {
        return ret;
    },
}

module.exports = mongoose.model('TrashCategory', trashCategorySchema);