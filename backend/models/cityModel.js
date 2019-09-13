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
    }],
    cap: {
        type: Number,
        require: true
    }
});
citySchema.statics.marshallCity = function(obj) {
    obj.binCategories = undefined
    return obj;
}
module.exports = mongoose.model('City', citySchema);