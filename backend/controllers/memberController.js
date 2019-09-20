var mongoose = require('mongoose');
var Exception = require("../utils/Exception")
var errorHandler = require("./errorManagement")
var httpCode = require("../httpCode")
var User = mongoose.model("User")
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
    if(! utils.sameMongoId(building.owner, res.locals.userAuth._id)) {
        res.setForbidden("Only owner can add members")
        return 
    }
    //take user passed
    let users = req.body
    let membersFetched = []
    //find user by uid or by email or by nickname
    let filterQuery = {
        firebase_uid : {
            $in : users
        }
    }
    User.find(filterQuery)
        .then(memberCandindates => {
            if(memberCandindates.length != users.length) {
                throw new Exception(httpCode.BAD_REQUEST, "some member doesn't exist in database")
            } else if(areUserAlreadyInBuiding(memberCandindates, building)) {
                throw new Exception(httpCode.CONFLICT, "some members are already in building")
            } else {
                membersFetched = memberCandindates
                memberCandindates.forEach(member => building.members.push(member._id))
                return building.save()
            }
        })
        .then(building => res.setOk(membersFetched))
        .catch(err => errorHandler(err, res))
}

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

let canUserAuthDeleteMember = function(memberToDelete, builing, userAuth) {
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
                //store new member without the member deleted
                let removeMember = function(item, index) {
                    return ! utils.sameMongoId(item, member._id)
                }
                building.members = building.members.filter(removeMember)
                return building.save()
            } else {
                throw new Exception(httpCode.FORBIDDEN)
            }
        })
        .then(el => res.setNoContent())
        .catch(err => errorHandler(err, res))
}