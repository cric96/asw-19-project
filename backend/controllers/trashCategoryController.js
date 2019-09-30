var mongoose = require('mongoose')
var TrashCategory = mongoose.model("TrashCategory")
var errorHandler = require("../utils/errorManagement")

exports.listTrashCategories = function(req, res) {
    TrashCategory.find()
        .then(categories => res.setOk(categories))
        .catch(err => errorHandler(err, res))
}