var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var binSchema = new Schema({
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
    trashCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrashCategory' }]
});

binSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.trashCategories;
        return ret;
    },
}
module.exports = mongoose.model('Bin', binSchema);