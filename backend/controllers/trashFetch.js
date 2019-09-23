var mongoose = require('mongoose')
var Trash = mongoose.model('Trash')
var User = mongoose.model('User')
var httpCode = require("../httpCode")
var Exception = require("../utils/Exception")
var utils = require("../utils/utils")

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
    return Promise.resolve(res.locals.filterBuilder) //enable a thenable chain 
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
        .then(builder => Trash.aggregate(createAggregationPipeline(builder)))
}

module.exports.trashesFetch = function(req, res) {
    return Promise.resolve(res.locals.filterBuilder) //enable a thenable chain 
        .then(builder => putUserInQuery(res.locals.userAuth, builder))
        .then(builder => Trash.aggregate(createAggregationPipeline(builder)))
}