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
    const userId = res.locals.userAuth._id;
    Building.aggregate([
        { 
            $unwind: { 
                path: "$members", 
                preserveNullAndEmptyArrays: true 
            }
        },
        { 
            $match: { 
                $or: [
                  { members: new mongoose.Types.ObjectId(userId) }, 
                  { owner: new mongoose.Types.ObjectId(userId) }
                ] 
            } 
        }
    ])
    .allowDiskUse(true)
    .exec(function (err, buildings) {
        console.log(err, buildings);
        if(!err){
            utils.sendResponseMessage(res, 200, buildings);
        }else{
            utils.sendResponseMessage(res, 404, buildings);
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
