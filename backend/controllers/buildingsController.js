var Exception = require("../utils/Exception")
var mongoose = require('mongoose');
var utils = require("../utils/utils");
var Building = mongoose.model('Building');
var User = mongoose.model("User")
var utils = require("../utils/utils");
var httpCode = require("../httpCode")
var errorHandler = require("./errorManagement")

function populateBuilding(query) {
    //.populate replace objectId with the object identify by the id
    return query.populate("owner") 
                .populate("members")
                .populate("city") 
}
function checkMembership(res, mongooseId, building, execIfIsInMembers) {
    //verify if user passed is in the member list
    if (building.members.find(user => utils.sameMongoId(mongooseId, user._id))) {
        execIfIsInMembers()
    } else {
        throw new Exception(httpCode.FORBIDDEN)
    }
}
//TODO owner must pass explicitly or not?
/**
 * create building from data passed into body.
 * read SWAGGER docs to see how the body must be structed
 */
exports.createBuildings = function(req, res) {
    var newBuilding = new Building(req.body)
    newBuilding.active = true //when we create a building it must be active
    newBuilding.owner = res.locals.userAuth._id //the _id mongo db
    newBuilding.members = [res.locals.userAuth._id] //only member is the owner
    //I suppuse that the city it is fetched by cityFetchedMiddleware
    newBuilding.city = res.locals.cityFetched._id //put city id fetched
    //verify the correctness of object (it must follow building schema)
    if(newBuilding.validateSync()) {
        res.setBadRequest()
    } else {
        //save building into mongodb
        newBuilding.save()
            .then(buildingInserted => {
                //put elements fetched inside attribute
                buildingInserted.city = res.locals.cityFetched
                buildingInserted.members = [res.locals.userAuth]
                buildingInserted.owner = res.locals.userAuth
                res.setCreated(buildingInserted)
            })
            .catch(err => errorHandler(err, res))
    }
};
/**
 * return all buildings stored inside the mongodb
 */
exports.listBuildings = function(req, res) {
    populateBuilding(Building.find())
        .then(buildings => buildings.map(building => building.toJSON())) //map each elements into JSON object
        .then(buildingsJSON => res.setOk(buildingsJSON))
        .catch(err => errorHandler(err, res))
}
/**
 * from the id, return a corrisponding elements inside the mongodb
 */
exports.readBuilding = function(req, res) {
    let buildingId = req.params.id
    let filterQuery = { 
        $and: [
            { 
                _id : buildingId //find building with the id passed
            }, 
            {
                active : true //verify if it is active or not
            }
        ]
    }
    populateBuilding(Building.findOne(filterQuery))
        .then(building => {
            if (building == null) {
                throw new Exception(httpCode.NOT_FOUND)
            } else {
                checkMembership(res, res.locals.userAuth._id, building, () => res.setOk(building))
            }
        })
        .catch(err => errorHandler(err, res))
}
/**
 * update the building with the data passed into the body.
 * read SWAGGER docs to see how the body must be structed
 */
exports.updateBuilding = function(req, res) {
    let buildingId = req.params.id
    let userId = res.locals.userAuth._id
    //remove attribute that not influce building mongo object
    let buildingUpdatedData = Building.prepareUpdate(req.body);
    //suppose that there is cityMiddleware
    buildingUpdatedData.city = res.locals.cityFetched

    populateBuilding(Building.findById(buildingId))
        .then(oldBuilding => {
            if (oldBuilding == null) {
                throw new Exception(httpCode.NOT_FOUND)
            } else if (!utils.sameMongoId(userId, oldBuilding.owner._id)){
                throw new Exception(httpCode.FORBIDDEN)
            } else { //ok you can update building
                //merge two object (the old one with the new one)
                let buildingUpdated = Object.assign(oldBuilding, buildingUpdatedData)
                if(buildingUpdated.validateSync()) { //verify if is correct
                    throw new Exception(httpCode.BAD_REQUEST) 
                } else {
                    //finally, save updated building
                    return buildingUpdated.save()
                }
            }
        })
        .then(buildingUpdated => res.setOk(buildingUpdated))
        .catch(err => errorHandler(err, res))
}
/**
 * this operation doesn't remove element from database, but make that element
 * not visible anymore. 
 */
exports.deleteBuilding = function(req, res) {
    Building.findById(req.params.id)
        .then(building => {
            if(building == null) {
                res.setNotFound()
            } else if(!utils.sameMongoId(building.owner, res.locals.userAuth._id)) {
                res.setForbidden()
            } else {
                building.active = false
                res.setNoContent()
                return building.save()
            }
        }).catch(err => errorHandler(err, res))
}

exports.getBuildingsOfUser = function(req, res) { 
    //it has index on members, this query is ok    
    let filterQuery = {
         $and : [
            { 
                
                members : mongoose.Types.ObjectId(res.locals.userAuth._id)
            },
            {
                active : true
            }
        ]
    }
    populateBuilding(Building.find(filterQuery))
        .then(buildings => res.setOk(buildings))
        .catch(err => errorHandler(err, res))
}