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
        ref: 'Bin'
    }],
    cap: {
        type: Number,
        require: true
    }
});
citySchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.binCategories = undefined
        return ret;
    },
}
module.exports = mongoose.model('City', citySchema);