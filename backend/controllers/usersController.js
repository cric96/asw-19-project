var mongoose = require('mongoose');
var utils = require("../utils/utils");
var User = mongoose.model('User');


exports.create_user = function(req, res) {
    var user = new User(req.body);
    var error = user.validateSync();
    if(error){
        utils.sendResponseMessage(res, 400, "Bad request; emailand firebase_uid are required fields");
    }else {
        user.save(function(err, newUser) {
            if(!err && newUser){
                utils.sendResponseMessage(res, 201, newUser);
            }else{
                console.log(err)
                if(err.code == 11000) {
                    utils.sendResponseMessage(res, 409, "Conflict: " + err.errmsg); 
                } else {
                    utils.sendResponseMessage(res, 500, "Internal Error"); 
                }
            }
        });
    }    
};

exports.get_user = function(req, res) {
    let uid = res.locals.uid;
    User.findOne({firebase_uid: uid}, function(err, user) {
        if(user && !err) {
            utils.sendResponseMessage(res, 200, user); 
        } else {
            utils.sendResponseMessage(res, 404, "User not found");
        }
    }); 
}

exports.update_user = function(req, res) {
    let uid = res.locals.uid;
    let updateUser = new User(req.body);
    console.log(uid)
    User.findOneAndUpdate({firebase_uid: uid}, updateUser, {new: true}, function(err, updatedUser){
        if (err){
            console.log(err);
			res.send(err);
        }else{
			if(updatedUser == null){
                utils.sendResponseMessage(res, 404, "User not found");
			}
			else{
                utils.sendResponseMessage(res, 200, updatedUser);
			}
		}
    });
};

