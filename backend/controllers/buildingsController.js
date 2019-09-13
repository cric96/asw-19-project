var Exception = require("../utils/Exception")
var mongoose = require('mongoose');
var utils = require("../utils/utils");
var Building = mongoose.model('Building');
var BinCategory = require("../models/binModel");
var City = require("../models/cityModel");
var Bin = require("../models/binModel");
var User = require("../models/userModel")
var utils = require("../utils/utils");

const FETCHING_ERROR = 1000
//TODO ADD CONSTANT
//TO CHECK
function checkMembership(res, mongooseId, building, execIfIsInMembers) {
    if (building.members.find(user => utils.sameMongoId(mongooseId, user._id))) {
        execIfIsInMembers()
    } else {
        res.setForbidden("You are not authorized to do this operation")
    }
}
exports.create_buildings = function(req, res) {
    var newBuilding = new Building(req.body)
    newBuilding.active = true //when we create a building it must be active
    newBuilding.owner = res.locals.userAuth._id //the _id mongo db
    membersFetched = [] //used to create building result
    cityFetched = null //used to create building result
    
    User.find({firebase_uid : {$in : req.body.members}})
        .then(members => {
            //store members to puts into result
            membersFetched = members.push(res.locals.userAuth)
            //map members into object ids (used to store into mongodb), prepare building object with this array
            newBuilding.members = members.map(member => member._id)
        })
        //find city in mongodb
        .then(() => City.findOne({cap : req.body.city.cap}))
        .then(city => {
            if(city == null) {
                throw new Exception(FETCHING_ERROR, "City not found")
            } else {
                //store city founded. It is used to put the right value in the response
                cityFetched = city
                return city._id
            }
        })
        .then(cityId => {
            newBuilding.city = cityId
            //verify the correctness of object (it must follow building schema)
            if(newBuilding.validateSync()) {
                throw new Exception(FETCHING_ERROR, "Bad request, body not valid") 
            } else {
                //save building into mongodb
                return newBuilding.save()
            }
        })
        .then(buildingInserted => {
            //prepare object to return
            buildingInserted.city = cityFetched
            buildingInserted.members = membersFetched
            buildingInserted.owner = res.locals.userAuth
            res.setCreated(buildingInserted)
        })
        .catch(err => {
            if(err.code == FETCHING_ERROR) {
                res.setBadRequest(err.msg)
            } else if(err.code == 11000){
                res.setConflict("Building already here")
            } else {
                console.log(err)
                res.setInternalError()
            }
        })
};

exports.list_buildings = function(req, res) {
    res.setInternalError("Not implemented")
}

exports.read_building = function(req, res) {
    let building_id = req.params.id
    Building.findOne({ $and: [{ _id : building_id }, { active : true }]})
        .populate("owner")
        .populate("members")
        .then(building => {
            if (building == null) {
                res.setNotFound("Building " + building_id + " not found")
            } else {
                checkMembership(res, res.locals.userAuth._id, building, () => res.setOk(building))
            }
        })
        .catch(err => res.setInternalError())
}
//TODO
exports.update_building = function(req, res) {
    let building_id = req.params.id
    let mongoose_id = res.locals.userAuth._id
    let updatedBuilding = Building.prepareUpdate(req.body);
    Building.findByIdAndUpdate(building_id, updatedBuilding)
        .populate('members')
        .exec()
        .then(buildingReturned => {
            if (buildingReturned == null) {
                utils.sendResponseMessage(res, 404, "Building not found")
            } else {
                checkMembership(res, mongoose_id, buildingReturned, () => utils.sendResponseMessage(res, 200, buildingReturned))
            }
        }).catch(err => utils.sendResponseMessage(res, 500, "Internal error"))
}

exports.delete_building = function(req, res) {
    
}

exports.get_buildings_of_user = function(req, res) {
    console.log(res.locals.uid)
    console.log(req.params.userId)
    //verify if the user logged is the same passed as parameter
    if(res.locals.uid != req.params.userId) { 
        res.setForbidden("You can see only your buildings")
        return
    }
    //it has index on members, this query is ok
    Building.find({members : res.locals.userAuth._id})
        .populate("owner") //fill with owner
        .populate("members") //fill with members
        .then(buildings => res.setOk(buildings))
        .catch(err => res.setInternalError(err))
}
exports.add_building_member = function(req, res) {
        let building_id = req.params.id
        let mongoose_id = res.locals.userAuth._id
        Building.findById(building_id).exec()
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