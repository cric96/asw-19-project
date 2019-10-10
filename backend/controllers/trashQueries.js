var mongoose = require('mongoose')
var Trash = mongoose.model('Trash')
var User = mongoose.model('User')
var httpCode = require("../utils/httpCode")
var Exception = require("../utils/Exception")
var utils = require("../utils/utils")
var QueryBuilder = require("../utils/AndFilterBuilder")

/**
 * add another filter based on the building id: take 
 * trashes if the building id match with the building
 * fetched (by url path)
 * @param {*} building the building specify in the url path  
 */
function putBuildingInQuery(building, filterBuilder) {
    return filterBuilder.pushFilter({ building : building._id })
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
function putUserInQuery({_id}, filterBuilder) {
    return filterBuilder.pushFilter({ user : _id })
}
/**
 * group element by attribute name passed, and count elements
 * 
 */
function groupAndCount(attributeName, attributeCountName = "value") {
    let attributeMongoName = "$" + attributeName
    return {
        _id : attributeMongoName,
        [attributeCountName] : { $sum : 1 }
    }
}

/**
 * this function is used to populate an entry
 * with some id with the corresponding object 
 * in another collection
 */
function lookupField(collectionsName, fieldName, localField = "_id", foreignField = "_id") {
    return {
        from : collectionsName,
        localField: localField,
        foreignField: foreignField,
        as: fieldName
    }
}
/**
 * project is what i want in the query result,
 * i must tell also the ordering (1 asc, -1 desc)
 */
const projection = {
    trashCategory : 1, 
    quantity : 1
}
function createGroupAndCountPipeline(filterBuilder, fieldName, collectionsName, countFieldName) {
    return [
        {
            $match : filterBuilder.build() //use filter query create with user, date and building
        },
        {
            $group : groupAndCount(fieldName, countFieldName) //group by the trash category and count the occurences. put the bin
        },
        {
            $lookup : lookupField(collectionsName, fieldName) //populate trash category
        },
        //lookup return always an array, even if you have only one element, unwind convert an array to a single element
        {
            $unwind : "$" + fieldName
        },
    ]
}

function createTrashPipeline(builder) {
    let baseBinPipeline = createGroupAndCountPipeline(builder, "trashCategory", "trashcategories", "quantity")
    baseBinPipeline.push({
        $project : projection
    })
    return baseBinPipeline
}
function createPipelineWithSorting(builder, fieldName, collectionsName, countFieldName, sort) {
    let baseBinPipeline = createGroupAndCountPipeline(builder, fieldName, collectionsName, countFieldName)
    baseBinPipeline.push({
        $sort : { value : sort }
    })
    return baseBinPipeline
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
        .then(builder => Trash.aggregate(createTrashPipeline(builder))) //
}
/**
 * return all trash thrown by a user.
 * the query has optionally a filter passed by builder.
 * this function return a Promise that wrap an array of collectedTrash. a collected
 * trash is an object with two values: trashCategory and quantity.
 */
module.exports.searchUserTrashes = function(user, builder = new QueryBuilder) {
    return Promise.resolve(builder) //enable a thenable chain 
        .then(builder => putUserInQuery(user, builder))
        .then(builder => Trash.aggregate(createTrashPipeline(builder)))
}

module.exports.trashesThrownByUsers = function(builder, sort) {
    let pipeline = createPipelineWithSorting(builder, "user", "users", "value", sort)
    return Trash.aggregate(pipeline)
}

module.exports.trashesThrownInCities = function(builder, sort) {
    let pipeline = createPipelineWithSorting(builder, "city", "cities", "value", sort)
    return Trash.aggregate(pipeline)
}

module.exports.trashesThrownInBuildings = function(builder, sort) {
    let pipeline = createPipelineWithSorting(builder, "building", "buildings", "value", sort)
    return Trash.aggregate(pipeline)
}