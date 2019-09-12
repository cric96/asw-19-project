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
    } else {
        user.save(function(err, newUser) {
            if (!err && newUser) {
                res.setCreated(newUser);
            } else {
                console.log(err)
                if (err.code == 11000) {
                    res.setConflict("Conflict: " + err.errmsg);
                } else {
                    res.setInternalError();
                }
            }
        });
    }
};

exports.get_user = function(req, res) {
    let userId = req.params.id;
    User.findOne({ firebase_uid: userId })
        .exec()
        .then(user => res.setOkIfNotNull(user, "User not found"))
        .catch(err => res.setInternalError(err))
}

exports.update_user = function(req, res) {
    let uid = res.locals.uid;
    if(req.params.id==uid){
        let updateUser = User.prepareUpdate(req.body);
        User.findOneAndUpdate({ firebase_uid: uid }, updateUser, { new: true }, function(err, updatedUser) {
            if (err) {
                console.log(err)
                res.setBadRequest();
            } else {
                if (updatedUser == null) {
                    res.setNotFound("User not found")
                } else {
                    res.setOk(updateUser)
                }
            }
        });
    }else{
        res.setForbidden("A user can update only his profile info")
    }
    
};

exports.get_all_users = function(req, res) {
    User.find().exec()
        .then(users => res.setOk(users))
        .catch(err => res.setInternalError(err))
}