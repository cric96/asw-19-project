var mongoose = require('mongoose')
var Trash = mongoose.model('Trash')
var User = mongoose.model('User')
var httpCode = require("../httpCode")
var Exception = require("../utils/Exception")
var utils = require("../utils/utils")

/**
 * add another filter based on the building id: take 
 * trashes if the building id match with the building
 * fetched (by url path)
 * @param {*} building the building specify in the url path  
 */
function putBuildingInQuery(building, filterBuilder) {
    return filterBuilder.pushFilter({
        building : building._id
    })
}
/**
 * retrieve the user into the database
 * with the same firebase id. If the user 
 * isn't in the db, put error code not found in the
 * response
 * @param {*} firebaseId the id to find into the database
 */
function fetchUser(firebaseId) {
    return User.findOne({firebase_uid : firebaseId})
        .then(user => utils.filterNullElement(user, "User not found"))
}
/**
 * verify if the user is in the building's members, if it'snt 
 * put not found into the response
 */
function filterUserInMember(user, building) {
    if(!building.isMember(user)){
        throw new Exception(httpCode.NOT_FOUND, "Member not found in building")
    } else {
        return user
    }
}
/**
 * add another filter based on user id, take trashes
 * if the user id match with the user id fatched
 */
function putUserInQuery(user, filterBuilder) {
    return filterBuilder.pushFilter(
        {
            user : user._id
        }
    )
}
/*
used to group element by trash category and
count the occurrencies
*/
const groupCatogoriesAndBin = {
    _id: "$trashCategory",
    quantity : {
        $sum : 1 //count the trash
    }
}
/**
 * this value is used to populate trash category,
 * i need the object, not only the id
 */
const lookupTrashCategory = {
    from: "trashcategories",
    localField: "_id",
    foreignField: "_id",
    as: "trashCategory"
}
/**
 * project is what i want in the query result,
 * i must tell also the ordering (1 asc, -1 desc)
 */
const projection = {
    trashCategory : 1, 
    quantity : 1
}
//create the pipeline (is like query in sql, but more powerfull)
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
/**
 * return all trash thrown into a building.
 * the query has optionally a filter in date, using to and from value passed in query.
 * the query has optionally a filter in user, using userId value passed in query. 
 * this function return a Promise that wrap an array of collectedTrash. a collected
 * trash is an object with two values: trashCategory and quantity.
 */
module.exports.searchBuildingTrashes = function(req, res) {
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
        .then(builder => Trash.aggregate(createAggregationPipeline(builder))) //
}
/**
 * return all trash thrown by a user.
 * the query has optionally a filter in date, using to and from value passed in query.
 * the query has optionally a filter in user, using userId value passed in query. 
 * this function return a Promise that wrap an array of collectedTrash. a collected
 * trash is an object with two values: trashCategory and quantity.
 */
module.exports.searchUserTrashes = function(req, res) {
    return Promise.resolve(res.locals.filterBuilder) //enable a thenable chain 
        .then(builder => putUserInQuery(res.locals.userAuth, builder))
        .then(builder => Trash.aggregate(createAggregationPipeline(builder)))
}