var mongoose = require('mongoose')
var User = mongoose.model("User")
var trashCategories = require("../models/cache").trashCategories
var City = mongoose.model("City")
var trashQuery = require("./trashQueries")
var errorHandler = require("../utils/errorManagement")
var utils = require("../utils/utils")
var Exception = require("../utils/Exception")
var httpCode = require("../utils/httpCode")
var AndBuilder = require("../utils/AndFilterBuilder")

//TODO Comments
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

function putCategoryInFilter(name, builder) {
    return new Promise((resolve, reject) => {
        let category = trashCategories.findByName(name)
        if(category === undefined) { //category doesn't found
            reject(new Exception(httpCode.NOT_FOUND, "Category not found"))
        } else {
            builder.pushFilter({trashCategory : mongoose.Types.ObjectId(category._id)})
            resolve(builder)
        }
    })
}

function putCityIfDefinedInFilter(cap, builder) {
    if(cap === undefined) {
        return Promise.resolve(builder)
    }
    return City.findOne({cap : cap})
        .then(city => utils.filterNullElement(city, "City not found"))
        .then(city => {
            builder.pushFilter({city : mongoose.Types.ObjectId(city._id)})
             
            return builder
        })
}
function createRankByCityAndCategory(category, cap, res, queryStrategy) {
    let builder = new AndBuilder()
    putCategoryInFilter(category, builder)
        .then(builder => putCityIfDefinedInFilter(cap, builder))
        .then(builder => queryStrategy(builder, res.locals.sort))
        .then(rank => res.setOk(rank))
        .catch(err => errorHandler(err, res))
}

function createRankByCategory(category, res, queryStrategy) {
    let builder = new AndBuilder()
    putCategoryInFilter(category, builder)
        .then(builder => queryStrategy(builder, res.locals.sort))
        .then(rank => res.setOk(rank))
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
            var category = req.query.orderBy
            var cap = req.query.cap
            createRankByCityAndCategory(category, cap, res, trashQuery.trashesThrownByUsers, )
    }
}

exports.getRankOfBuildings = function(req, res) {
    var category = req.query.orderBy
    var cap = req.query.cap
    createRankByCityAndCategory(category, cap, res, trashQuery.trashesThrownInBuildings, req.query.cap)
}

exports.getRankOfCities = function(req, res) {
    var category = req.query.orderBy
    createRankByCategory(category, res, trashQuery.trashesThrownInCities)
}
