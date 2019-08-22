var mongoose = require('mongoose');
var utils = require("../utils/utils");
var User = mongoose.model('User');


exports.create_user = function(req, res) {
    console.log(JSON.stringify(req.body))
    var user = new User(req.body);
    console.log(user)
    var error = user.validateSync();
    if(error){
        utils.sendResponseMessage(res, 400, "Bad request; email,name,surname,nickname and firebase_uid are required fields");
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
            res.status(200).json(user);
        } else {
            res.status(404).json({
                description: 'User not found!'
            });
        }
    }); 
}

exports.update_user = function(req, res) {
    let uid = res.locals.uid;
    let updateUser = new User(req.body);
    User.findOneAndUpdate({firebase_uid: uid}, updateUser.prepareUpdate(), {new: true}, function(err, updateUser){
        if (err)
			res.send(err);
		else{
			if(updateUser == null){
				res.status(404).send({
					description: 'User not found'
				});
			}
			else{
				res.json(updateUser);
			}
		}
    });
};

