var mongoose = require('mongoose');
var Exception = require("../utils/Exception")
var errorHandler = require("../utils/errorManagement")
var httpCode = require("../utils/httpCode")
var User = mongoose.model("User")
var Building = mongoose.model("Building")
var utils = require('../utils/utils')

let areUserAlreadyInBuiding = function(candidates, building) {
    return candidates.filter(candidate => building.isMember(candidate)).length != 0
}
/**
 * try to add members in a building identify by firebase uid.
 * if one of these element aren't in the database or is already in building,
 * no one of members are inserted in the database
 */
exports.addBuildingMember = function(req, res) {
    let building = res.locals.buildingFetched
    if(!building.isOwner(res.locals.userAuth)) {
        res.setForbidden("Only owner can add members")
        return 
    }
    //take user passed
    let users = req.body
    let membersFetched = []
    //get all user that match with the firebase uid passed
    let filterQuery = {
        firebase_uid : {
            $in : users
        }
    }
    User.find(filterQuery)
        .then(memberCandindates => {
            //if some uid is not valid, thrown bad request (no member is added into the db)
            if(memberCandindates.length != users.length) {
                throw new Exception(httpCode.BAD_REQUEST, "some member doesn't exist in database")
            //if some user is already in building, thrown bad request (no member is added into the db)
            } else if(areUserAlreadyInBuiding(memberCandindates, building)) {
                throw new Exception(httpCode.CONFLICT, "some members are already in building")
            } else {
                membersFetched = memberCandindates //store the member that could be insert into the building
                return Building.findOneAndUpdate({_id: building._id}, {
                    $push: {
                        members: { $each: memberCandindates }
                    },
                }, { returnNewDocument: true} )
            }
        })
        .then(building => res.setOk(membersFetched))
        .catch(err => errorHandler(err, res))
}
/**
 * retrive all building members
 */
exports.listBuildingMembers = function(req, res) {
    let building = res.locals.buildingFetched
    //find all users defined in member array
    let filterQuery = {
        _id : {
            $in : building.members.map(id => mongoose.Types.ObjectId(id))
        }
    }
    if(building.isMember(res.locals.userAuth)) {
        User.find(filterQuery)
            .then(users => users.map(user => user.toJSON()))
            .then(users => res.setOk(users))
            .catch(err => errorHandler(err, res))
    } else {
        res.setForbidden("Only members can show other members")
    }
}
/**
 * verify if the user logged into the system, can delete a member:
 * it is possible if the member is the user logged or if the user
 * logged is the building's owner
 */
function canUserAuthDeleteMember(memberToDelete, builing, userAuth) {
    let memberIsUserAuth = utils.sameMongoId(memberToDelete, userAuth._id)
    let userAuthIsOwner = utils.sameMongoId(builing.owner, userAuth._id)
    return memberIsUserAuth || userAuthIsOwner
}
exports.deleteBuildingMember = function(req, res) {
    let user = res.locals.userAuth
    let building = res.locals.buildingFetched
    let filterQuery = {
        firebase_uid : req.params.memberId
    }
    User.findOne(filterQuery)
        .then(utils.filterNullElement)
        .then(member => { //filter the member id, if is in the building, it can be deleted
            if(building.isMember(member)) {
                return member
            } else {
                throw new Exception(httpCode.BAD_REQUEST, "User must be in building")
            }
        })
        .then(member => {
            //if the member id is owner, it can't be delete 
            if(building.isOwner(member)) {
                throw new Exception(httpCode.FORBIDDEN, "Owner can't delete itself (for now)")
            } else if(canUserAuthDeleteMember(member._id, building, user)) {
                // update the building removing the member using $pull
                return Building.updateOne({_id: building._id}, {
                    $pull: { members: member._id }
                })
            } else {
                throw new Exception(httpCode.FORBIDDEN)
            }
        })
        .then(el => res.setNoContent())
        .catch(err => errorHandler(err, res))
}