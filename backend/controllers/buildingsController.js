var mongoose = require('mongoose');
var utils = require("../utils/utils");
var Building = mongoose.model('Building');
var BinCategory = require("../models/binCategoryModel");
var Bin = require("../models/binModel");

//TO CHECK
function execIfUserIsInBuilding(mongooseId, building, callback) {
    if(buildings.members.find(user => mongooseId == user._id)) {
        callback()
    } else {
        utils.sendResponseMessage(res, 403, "You are not member or owner of this building")
    }
}
exports.create_buildings = function(req, res) {
    var newBuilding = new Building(req.body)
    newBuilding.owner = res.locals.userAuth._id
    newBuilding.members = [res.locals.userAuth._id]
    
    var error = newBuilding.validateSync()
    if(error){
        console.log(error)
        utils.sendResponseMessage(res, 400, "Bad request; email and firebase_uid are required fields");
    } else {
        BinCategory.find({ city: new mongoose.Types.ObjectId(newBuilding.city) }).exec()
        .then(binCategories => {
            console.log(binCategories);
            return binCategories.map(element => new Bin({ binCategory: element, trash: [] }))
        }).then(bins => {
            console.log(bins);
            newBuilding.bins = bins
            newBuilding.active = true
            return newBuilding.save()
        }).then(insertBuilding => {
            utils.sendResponseMessage(res, 201, insertBuilding)
        }).catch(err => {
            if(err.code == 11000) {
                utils.sendResponseMessage(res, 409, "Conflict: " + err.errmsg) 
            } else {
                console.log(err)
                utils.sendResponseMessage(res, 500, "Internal Error")
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
                members: new mongoose.Types.ObjectId(userId)                 
            } 
        }
    ])
    .allowDiskUse(true)
    .exec(function (err, buildings) {
        console.log(err, buildings)
        if(!err){
            utils.sendResponseMessage(res, 200, buildings)
        }else{
            utils.sendResponseMessage(res, 404, buildings)
        }
    });
}

exports.read_building = function(req, res) {
    building_id = req.params.id
    Building.findById(building_id)
            .exec()
            .then(building => {
                if(building == null) {
                    utils.sendResponseMessage(res, 404, "Building " + building_id + " not found")
                } else {
                    execIfUserIsInBuilding(res.locals.userAuth._id, building, () => utils.sendResponseMessage(res, 200, building))
                }
            })
            .catch(err => {
                utils.sendResponseMessage(res, 500, "Internal error")
            })
}

exports.update_building = function(req, res) {
    buildings_id = req.params.id
    let updatedBuilding = Building.prepareUpdate(req.body);
    Building.findByIdAndUpdate(building_id, updatedBuilding)
        .exec()
        .populate(members)
        .then(buildingReturned => {
            if(buildingReturned == null) {
                utils.sendResponseMessage(buildingReturned, 404, "Building not found")
            } else {
                execIfUserIsInBuilding(res.locals.uid, buildings, () => utils.sendResponseMessage(res, 200, buildingReturned))
            }
            utils.sendResponseMessage(res, 200, res)
        }).catch(err => utils.sendResponseMessage(res, 500, "Internal error"))
}

exports.add_building_member = function(req, res) {
    building_id = req.params.id
    mongoose_id = res.locals.userAuth._id
    Building.findById(buildings_id).exec()
        .then(building => {

        })
        .catch(err => {
            
        })
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
