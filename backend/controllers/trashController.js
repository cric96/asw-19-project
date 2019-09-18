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
    let user = res.locals.userAuth
    if(!res.locals.buildingFetched.isMember(user)) {
        res.setForbidden("Forbidden, you must be a building's member")
        return
    }
    //TODO remember to add socket io and to add score in user
    TrashCategory.findOne(query)
        .then(utils.filterNullElement)
        .then(category => {
            var trash = new Trash()
            trash.trashCategory = category._id
            trash.building = res.locals.buildingFetched._id
            trash.user = user._id
            user.score += category.score
            return Promise.all([user.save(), trash.save()])//to fix: handle errors in the first promise
        })
        .then(el => res.setNoContent())
        .catch(err => errorHandler(err, res))
};

exports.listUserTrashes = function(req, res) {
    trashFetching.trashesFetch(req, res)
        .then(trashes => res.setOk(trashes))
}
