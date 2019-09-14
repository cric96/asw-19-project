var mongoose = require('mongoose');
var utils = require("../utils/utils");
var User = mongoose.model('User');


exports.create_user = function(req, res) {
    var user = new User(req.body);
    console.log(user)
    var error = user.validateSync();
    if (error) {
        console.log(error)
        res.setBadRequest("Bad request; email and firebase_uid are required fields");
        return;
    }
    user.save()
        .then(newUser => {
            res.setCreated(newUser)
        })
        .catch(err => {
            //check if put this code inside decore
            if(err.code == 11000) { //TODO PUT COSTANT
                res.setConflict("Conflict: " + err.errmsg);
            } else {
                console.log(err)
                res.setInternalError();
            }
        })

};

exports.get_user = function(req, res) {
    console.log("here")
    let uid = res.locals.uid
    User.findOne({ firebase_uid: uid })
        .exec()
        .then(user => res.setOkIfNotNull(user, "User not found"))
        .catch(err => res.setInternalError(err))
}

exports.update_user = function(req, res) {
    let uid = res.locals.uid;
    let updateUser = User.prepareUpdate(req.body)
    User.findOneAndUpdate({ firebase_uid: uid }, updateUser, { new: true })
        .exec()
        .then(updatedUser => res.setOkIfNotNull(updatedUser, "User not found"))
        .catch(err => res.setBadRequest())
};

exports.get_all_users = function(req, res) {
    User.find().exec()
        .then(users => res.setOk(users))
        .catch(err => res.setInternalError(err))
}