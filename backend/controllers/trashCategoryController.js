var cache = require("../models/cache")

exports.listTrashCategories = function(req, res) {
    res.setOk(cache.trashCategories.elements)
}