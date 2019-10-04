var mongoose = require('mongoose');
var Trash = mongoose.model('Trash');
var trashCategories = require("../models/cache").trashCategories
var utils = require('../utils/utils')
var fetchQueries = require("./trashQueries")
var errorHandler = require("../utils/errorManagement")
//var io = require('socket.io')(http)
exports.insertTrash = function(req, res) {
    let query = {
        name : req.body.name //filter by trash category passed into the body
    }
    let user = res.locals.userAuth
    //i can trown trash only if I am a member of the building 
    if(!res.locals.buildingFetched.isMember(user)) {
        res.setForbidden("Forbidden, you must be a building's member")
        return
    }
    //TODO remember to add socket io and to add score in user
    let category = trashCategories.findByName(req.body.name)
    if(category === undefined) {
        res.setNotFound()
        return
    }
    var trash = new Trash({
        trashCategory : category._id,
        building : res.locals.buildingFetched._id,
        city : res.locals.buildingFetched.city,
        user : user._id
    })
    //update user
    user.score += category.score
    Promise.all([user.save(), trash.save()]) //to fix: handle errors in the first promise    
        .then(el => res.setNoContent()) //all ok, return no content means that the trash is added into the db
        .catch(err => errorHandler(err, res))
    
};
/**
 * this function is used to create the response.
 * the array loaded from db, could not has all trash categories,
 * but I need to show the category with no trash thrown too.
 * @param {*} trashCategories all trash categories store in the db
 * @param {*} trashesCollected the trash thrown by users
 */
function createResponseArray(trashCategories, trashesCollected) {
    //map all trash categories, if some trash category isn't in the trash thrown by user, put quantity equal to 0
    return trashCategories.map(trashCategory => {
        //verify if the category is in the trash thrown
        let trashCollected = trashesCollected.find(trash => utils.sameMongoId(trash.trashCategory._id, trashCategory._id))
        if(trashCollected === undefined) { //if it is undefined, it means that no trash with this category has thrown by user
            return {
                category : trashCategory,
                quantity : 0
            }
        } else { //otherwise, return the trash collected loaded from db
            return trashCollected
        }
    })
}
exports.listUserTrashes = function(req, res) {
    TrashCategory.find()
        .then(trashCategories => {
            return fetchQueries.searchUserTrashes(req, res)
                .then(collectedTrashes => createResponseArray(trashCategories, collectedTrashes))
        })
        .then(collectedTrashes => res.setOk(collectedTrashes))
        .catch(err => errorHandler(err, res))
}
