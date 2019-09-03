var mongoose = require('mongoose');
var utils = require("../utils/utils");
var Building = mongoose.model('Building');


exports.create_buildings = function(req, res) {
    var newBuilding = new Building(req.body);
    newBuilding.owner = res.locals.userAuth._id;
    newBuilding.members = []
    var error = newBuilding.validateSync();
    if(error){
        console.log(error)
        utils.sendResponseMessage(res, 400, "Bad request; email and firebase_uid are required fields");
    }else {
        userccontroller.addBuild.then
        newBuilding.save(function(err, inseredBuilding) {
            if(!err && inseredBuilding){

                utils.sendResponseMessage(res, 201, inseredBuilding);
            }else{
                console.log(err)
                if(err.code == 11000) {
                    utils.sendResponseMessage(res, 409, "Conflict: " + err.errmsg); 
                } else {
                    console.log(err)
                    utils.sendResponseMessage(res, 500, "Internal Error"); 
                }
            }
        });
    }    
};

exports.list_buildings = function(req, res) {
    let uid = res.locals.uid;
    User.findOne({firebase_uid: uid}, function(err, user) {
        if(user && !err) {
            utils.sendResponseMessage(res, 200, user); 
        } else {
            utils.sendResponseMessage(res, 404, "User not found");
        }
    }); 
}
/*

exports.update_user = function(req, res) {
    let uid = res.locals.uid;
    let updateUser = User.prepareUpdate(req.body);
    User.findOneAndUpdate({firebase_uid: uid}, updateUser, {new: true}, function(err, updatedUser){
        if (err){
            console.log(err)
            utils.sendResponseMessage(res, 400, "Bad request");
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
*/
