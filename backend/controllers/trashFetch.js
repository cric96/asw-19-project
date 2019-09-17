var mongoose = require('mongoose')
var Trash = mongoose.model('Trash')
var httpCode = require("../httpCode")
var Exception = require("../utils/Exception")
var QueryBuilder = require("../utils/QueryBuilder")
var utils = require("../utils/utils")

function queryBuilding(req, res) {
    return new Promise((resolve, reject) => {
        resolve(new QueryBuilder())
    }) 
}

function areDatesValid(from, to) {
    return (from === undefined || isFinite(from)) && (to === undefined || isFinite(to))
}

function putFilterDateInQuery(req, queryBuilder) {
    if(!areDatesValid(req.query.to, req.query.from)) {
        throw new Exception(httpCode.BAD_REQUEST, "Put timestamp in date field")
    }
    let to = req.query.to === undefined ? new Date() : new Date(req.query.to)
    let from = req.query.from === undefined ? new Date(1) : new Date(req.query.from)
    return queryBuilder.pushFilter({
        date: {
            $lt : to,
            $gt : from
        }
    })
}

function putBuildingInQuery(building, queryBuilder) {
    return queryBuilder.pushFilter({
        building : building._id
    })
}

function fetchUser(firebaseId, buildingFetched) {
    return User.findOne({firebase_id : firebaseId})
        .then(user => utils.filterNullElement(user, "User not found"))
}

function filterUserInMember(user, buildingFetched) {
    if(! buildingFetched.isUserInBuilding(user)){
        throw new Exception(httpCode.NOT_FOUND, "Member not found in building")
    } else {
        return user
    }
}

function putUserInQuery(user, queryBuilder) {
    return queryBuilder.pushFilter(
        {
            user : user.firebase_id
        }
    )
}

const groupCatogoriesAndBin = {
    _id: "$trashCategory",
    count : {
        $sum : 1 //count the trash
    },
    binId: {
        $max:"$bin" //in this context we assume that for a trash category in building there is only one bin for all trash, max it is used to avoid an array on the same bins
    }
}

const lookupBin = {
    from: "bins",
    localField: "binId",
    foreignField: "_id",
    as: "bin"
}

const lookupTrashCategory = {
    from: "trashcategories",
    localField: "_id",
    foreignField: "_id",
    as: "trashCategory"
}

const projection = {
    trashCategory : 1,
    bin : 1,
    count : 1
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
            $lookup : lookupBin //populate bins
        },
        {
            $lookup : lookupTrashCategory //populate trash category
        },
        //lookup return always an array, even if you have only one element, unwind convert an array to a single element
        {
        $unwind : "$bin" 
        },
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
        .then(queryBuilder => Trash.aggregate(createAggregationPipeline(queryBuilder)))
}

module.exports.trashesFetch = function(req, res) {
    return queryBuilding()
        .then(builder => putFilterDateInQuery(req, builder))
        .then(builder => putUserInQuery(res.locals.userAuth, builder))
        .then(queryBuilder => Trash.aggregate(createAggregationPipeline(queryBuilder)))
}