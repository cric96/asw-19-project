var mongoose = require('mongoose');
var Exception = require("../utils/Exception")
var errorHandler = require("./errorManagement")
var httpCode = require("../httpCode")
var User = mongoose.model("User")
var utils = require('../utils/utils')


let isUserInMembers = function(members, user) {
    return members.find(member => utils.sameMongoId(member._id, user._id))
}

let areUserAlreadyInBuiding = function(candidates, members) {
    return candidates.filter(candidate => isUserInMembers(members, candidate)).length != 0
}
/**
 * try to add members in a building identify by firebase uid.
 * if one of these element aren't in the database or is already in building,
 * no one of members are inserted in the database
 */
exports.add_building_member = function(req, res) {
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
            } else if(areUserAlreadyInBuiding(memberCandindates, building.members)) {
                throw new Exception(httpCode.BAD_REQUEST, "some members are already in building")
            } else {
                membersFetched = memberCandindates
                memberCandindates.forEach(member => building.members.push(member._id))
                return building.save()
            }
        })
        .then(building => res.setOk(membersFetched))
        .catch(err => errorHandler(err, res))
}

exports.get_building_members = function(req, res) {
    let userId = mongoose.Types.ObjectId(res.locals.userAuth._id)
    let building = res.locals.buildingFetched
    //find all users defined in member array
    let filterQuery = {
        _id : {
            $in : building.members.map(id => mongoose.Types.ObjectId(id))
        }
    }
    if(building.members.includes(userId)) {
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
exports.delete_building_member = function(req, res) {
    let user = res.locals.userAuth
    let building = res.locals.buildingFetched
    let filterQuery = {
        firebase_uid : req.params.memberId
    }
    User.findOne(filterQuery)
        .then(user => {
            if(user == null) {
                throw new Exception(httpCode.NOT_FOUND, "User not found")
            } else {
                return mongoose.Types.ObjectId(user._id)
            }
        })
        .then(memberId => { //filter the member id, if is in the building, it can be deleted
            if(isUserInMembers(building.members, memberId)) {
                return memberId
            } else {
                throw new Exception(httpCode.BAD_REQUEST, "User must be in building")
            }
        })
        .then(memberId => {
            //if the member id is owner, it can't be delete 
            if(utils.sameMongoId(memberId, building.owner)) {
                throw new Exception(httpCode.FORBIDDEN, "Owner can't delete itself (for now)")
            } else if(canUserAuthDeleteMember(memberId, building, user)) {
                //store new member without the member deleted
                building.members = building.members.filter((item, index) => ! utils.sameMongoId(item, memberId))
                return building.save()
            } else {
                throw new Exception(httpCode.FORBIDDEN)
            }
        })
        .then(el => res.setNoContent())
        .catch(err => errorHandler(err, res))
}