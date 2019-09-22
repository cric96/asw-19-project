var mongoose = require('mongoose')
var Trash = mongoose.model('Trash')
var User = mongoose.model('User')
var httpCode = require("../httpCode")
var Exception = require("../utils/Exception")
var AndFilterBuilder = require("../utils/AndFilterBuilder")
var utils = require("../utils/utils")

function queryBuilding(req, res) {
    return new Promise((resolve, reject) => {
        resolve(new AndFilterBuilder())
    }) 
}

function areDatesValid(from, to) {
    return (from === undefined || isFinite(from)) && (to === undefined || isFinite(to))
}
function parseDateOrElse(timestap, orElseDate) {
    return timestap === undefined ? orElseDate : new Date(parseInt(timestap))
} 
function putFilterDateInQuery(req, AndFilterBuilder) {
    if(!areDatesValid(req.query.to, req.query.from)) {
        throw new Exception(httpCode.BAD_REQUEST, "Put timestamp in date field")
    }
    let to = parseDateOrElse(req.query.to, new Date())
    let from = parseDateOrElse(req.query.from, new Date(1))
    return AndFilterBuilder.pushFilter({
        date: {
            $lt : to,
            $gt : from
        }
    })
}

function putBuildingInQuery(building, AndFilterBuilder) {
    return AndFilterBuilder.pushFilter({
        building : building._id
    })
}

function fetchUser(firebaseId, buildingFetched) {
    console.log(firebaseId)
    return User.findOne({firebase_uid : firebaseId})
        .then(user => utils.filterNullElement(user, "User not found"))
}

function filterUserInMember(user, buildingFetched) {
    if(!buildingFetched.isMember(user)){
        throw new Exception(httpCode.NOT_FOUND, "Member not found in building")
    } else {
        return user
    }
}

function putUserInQuery(user, AndFilterBuilder) {
    console.log(user)
    return AndFilterBuilder.pushFilter(
        {
            user : user._id
        }
    )
}

const groupCatogoriesAndBin = {
    _id: "$trashCategory",
    quantity : {
        $sum : 1 //count the trash
    }
}

const lookupTrashCategory = {
    from: "trashcategories",
    localField: "_id",
    foreignField: "_id",
    as: "trashCategory"
}

const projection = {
    trashCategory : 1,
    quantity : 1
}

function createAggregationPipeline(builder) {
    return [
        {
            $match : builder.build() //use filter query create with user, date and building
        },
        {
            $group : groupCatogoriesAndBin //group by the trash category and count the occurences. put the bin
        },
        {
            $lookup : lookupTrashCategory //populate trash category
        },
        //lookup return always an array, even if you have only one element, unwind convert an array to a single element
        {
            $unwind : "$trashCategory"
        },
        {
            $project : projection
        }
        
    ]
}
module.exports.binsFetch = function(req, res) {
    let building = res.locals.buildingFetched
    return queryBuilding()
        .then(builder => putFilterDateInQuery(req, builder))
        .then(builder => putBuildingInQuery(building, builder))
        .then(builder => {
            if(req.query.userId === undefined) {
                return builder
            } else {
                return fetchUser(req.query.userId)
                    .then(user => filterUserInMember(user, building))
                    .then(user => putUserInQuery(user, builder))
            }
        })
        .then(AndFilterBuilder => Trash.aggregate(createAggregationPipeline(AndFilterBuilder)))
}

module.exports.trashesFetch = function(req, res) {
    return queryBuilding()
        .then(builder => putFilterDateInQuery(req, builder))
        .then(builder => putUserInQuery(res.locals.userAuth, builder))
        .then(AndFilterBuilder =>  Trash.aggregate(createAggregationPipeline(AndFilterBuilder)))
}