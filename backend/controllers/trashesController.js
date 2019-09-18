var mongoose = require('mongoose');
var Trash = mongoose.model('Trash');
var TrashCategory = mongoose.model('TrashCategory')
var utils = require('../utils/utils')
var trashFetching = require("./trashFetch")
var errorHandler = require("./errorManagement")

exports.insertTrash = function(req, res) {
    let query = {
        name : req.body.name
    }
    if(!res.locals.buildingFetched.isMember(res.locals.userAuth)) {
        res.setForbidden("Forbidden, you must be a building's member")
        return
    }
    TrashCategory.findOne(query)
        .then(utils.filterNullElement)
        .then(category => {
            var trash = new Trash()
            trash.trashCategory = category._id
            trash.building = res.locals.buildingFetched._id
            trash.user = res.locals.userAuth._id
            return trash.save()
        })
        .then(el => res.setNoContent())
        .catch(err => errorHandler(err, res))
};

exports.getUserTrashes = function(req, res) {
    trashFetching.trashesFetch(req, res)
        .then(trashes => res.setOk(trashes))
}
