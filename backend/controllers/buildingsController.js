var mongoose = require('mongoose');
var utils = require("../utils/utils");
var Building = mongoose.model('Building');
var BinCategory = require("../models/binCategoryModel");
var Bin = require("../models/binModel");

exports.create_buildings = function(req, res) {
    var newBuilding = new Building(req.body);
    newBuilding.owner = res.locals.userAuth._id;
    newBuilding.members = [res.locals.userAuth._id];
    
    var error = newBuilding.validateSync();
    if(error){
        console.log(error)
        utils.sendResponseMessage(res, 400, "Bad request; email and firebase_uid are required fields");
    } else {
        console.log(newBuilding.city);
        BinCategory.find({ city: mongoose.Types.ObjectId(newBuilding.city)}, function(err, results){
            console.log(results);
        });/*
        BinCategory.find({ city: new mongoose.Types.ObjectId(newBuilding.city) }).exec()
        .then(binCategories => {
            console.log(binCategories);
            return binCategories.map(element => new Bin({ binCategory: element, trash: [] }));
        }).then(bins => {
            console.log(bins);
            newBuilding.bins = bins;
            return newBuilding.save();
        }).then(insertBuilding => {
            utils.sendResponseMessage(res, 201, insertBuilding);
        }).catch(err => {
            if(err.code == 11000) {
                utils.sendResponseMessage(res, 409, "Conflict: " + err.errmsg); 
            } else {
                console.log(err)
                utils.sendResponseMessage(res, 500, "Internal Error"); 
            }
        });*/
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
