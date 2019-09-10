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
    let uid = res.locals.uid;
    User.findOne({ firebase_uid: uid }, function(err, user) {
        if (user && !err) {
            res.setOk(user);
        } else {
            res.setNotFound("User not found");
        }
    });
}

exports.update_user = function(req, res) {
    let uid = res.locals.uid;
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
};

exports.get_all_users = function(req, res) {
    
}