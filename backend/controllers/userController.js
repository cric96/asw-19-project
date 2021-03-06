var mongoose = require('mongoose');
var User = mongoose.model('User');
var errorHandler = require("../utils/errorManagement")
var utils = require("../utils/utils")

exports.createUser = function(req, res) {
    var user = new User(req.body);
    var error = user.validateSync();
    if (error) {
        res.setBadRequest("Bad request; email and firebase_uid are required fields");
        return;
    }
    user.save()
        .then(newUser => res.setCreated(newUser))
        .catch(err => errorHandler(err, res))
}

exports.getUser = function(req, res) {
    let uid = res.locals.uid
    User.findOne({ firebase_uid: uid })
        .then(utils.filterNullElement)
        .then(user => res.setOk(user))
        .catch(err => errorHandler(err, res))
}

exports.updateUser = function(req, res) {
    let uid = res.locals.uid;
    let updateUser = User.prepareUpdate(req.body)
    User.findOneAndUpdate({ firebase_uid: uid }, updateUser, { new: true })
        .then(utils.filterNullElement)
        .then(updatedUser => res.setOk(updatedUser))
        .catch(err => res.setBadRequest())
};

function filterOrBuilder () {
    this.filters = []

    this.appendIfDefined = function(attributeName, attribute) {
        if(attribute !== undefined) {
            this.filters.push( {
                [attributeName] : { $regex: attribute , "$options": "i" }
            })
        }
        return this
    }

    this.build = function() {
        if(this.filters.length == 0) {
            return {}
        } else {   
            return { $or : this.filters }
        }
    }
}
exports.listUsers = function(req, res) {
    let filter = req.query.filter
    let filterQuery = new filterOrBuilder()
        .appendIfDefined("name", filter)
        .appendIfDefined("surname", filter)
        .appendIfDefined("email", filter)
        .appendIfDefined("nickname", filter)
        .build()
    let query = User.find(filterQuery)
    if(req.query.limit !== undefined && utils.isNumeric(req.query.limit)) {
        query.limit(parseInt(req.query.limit))
    }
    query
        .then(users => res.setOk(users))
        .catch(err => res.setInternalError(err))
}