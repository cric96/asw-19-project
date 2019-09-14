var utils = require("../../utils/utils");
var mongoose = require('mongoose');
/**
 * verify if the id passed in req.params.id is
 * a mongodb id
 */
module.exports = function(req, res, next) { 
    let id = req.params.id
    if(mongoose.Types.ObjectId.isValid(id)) {
        next()
    } else {
        utils.sendResponseMessage(res, 400, 'Invalid resource id')
    }
}