var mongoose = require('mongoose')
var User = mongoose.model("User")
var TrashCategory = mongoose.model("TrashCategory")
var City = mongoose.model("City")
var Building = mongoose.model("Building")
var trashQuery = require("./trashQueries")
var errorHandler = require("../utils/errorManagement")
var utils = require("../utils/utils")
var AndBuilder = require("../utils/AndFilterBuilder")
/**
 * This function map the user with the
 * reppresentation used in ranks
 */
function mapUserForResponse(user, attributeName) {
    return {
        user : user,
        value : user[attributeName]
    }
}
/**
 * This function is used to limit the number of results and marshall the user.
 * @param {*} promise 
 * @param {*} attributeName used to marshall the user
 */
function prepareResponse(res, promise, attributeName){
    promise.limit(res.locals.limit)
        .then(users => users.map(user => mapUserForResponse(user, attributeName)))
        .then(users => res.setOk(users))
        .catch(err => errorHandler(err, res))
}

function createRankFor(req, res, queryStrategy) {
    let builder = new AndBuilder()
    var capPassed = req.query.cap !== undefined
    var fetchCity = Promise.resolve()
    var fetchTrashCategory = TrashCategory.findByName(req.query.orderBy, res)
        .then(category => builder.pushFilter({trashCategory : mongoose.Types.ObjectId(category._id)}))
    if(capPassed){
        fetchCity = City.findOne({cap : req.query.cap})
            .then(city => utils.filterNullElement(city, "City not found"))
            .then(city => builder.pushFilter({city : mongoose.Types.ObjectId(city._id)}))
    }
    
    Promise.all([fetchTrashCategory, fetchCity])
        .then(() => {
            return queryStrategy(builder, res.locals.sort)
                .then(rank => res.setOk(rank))
        })
        .catch(err => errorHandler(err, res)) 
}

exports.getRankOfUsers = function(req, res) {
    let orderBy = req.query.orderBy
    switch(orderBy) {
        //is like (if (orderBy === 'score' || orderBy === 'level')
        case 'score':
        case 'level':
            var promise = User.find()
                .sort({[orderBy] : res.locals.sort})
            prepareResponse(res, promise, orderBy)
            break

        case 'rewards':
            var promise = User.aggregate([            
                {
                    $addFields: { 
                        numberOfRewards: { $size: "$rewards" } 
                    }
                },
                {
                    $sort: { numberOfRewards : res.locals.sort }
                }
            ])
            prepareResponse(res, promise, "numberOfRewards")
            break

        default:
            createRankFor(req, res, trashQuery.trashesThrownByUsers)
    }
}

exports.getRankOfBuildings = function(req, res) {
    createRankFor(req, res, trashQuery.trashesThrownInBuildings)
}

exports.getRankOfCities = function(req, res) {
    req.query.cap = undefined //clear the cap because in city query it has to be ignored
    createRankFor(req, res, trashQuery.trashesThrownInCities)
}
