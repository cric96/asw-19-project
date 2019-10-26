var mongoose = require('mongoose')
var Trash = mongoose.model('Trash')
var trashCategories = require("../models/cache").trashCategories
var utils = require('../utils/utils')
var fetchQueries = require("./trashQueries")
var errorHandler = require("../utils/errorManagement")
var socket = require("../socket")
var cache = require("../models/cache")

exports.insertTrash = function(req, res) {
    let user = res.locals.userAuth
    let buildingFetched = res.locals.buildingFetched
    //i can trown trash only if I am a member of the building 
    if(!buildingFetched.isMember(user)) {
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
        building : buildingFetched._id,
        city : buildingFetched.city,
        user : user._id
    })
    //update user
    var newLevel = user.updateScore(category.score)
    var rewardsUnlocked = []
    cache.rewards.getUnlockedByUser(user)
        .then(rewards => {
            rewardsUnlocked = rewards.map(reward => reward._id)
            user.rewards = user.rewards.concat(rewards)
        })
        .then(() => Promise.all([user.save(), trash.save()])) //to fix: handle errors in the first promise)
        .then(el => {
            res.setNoContent()
            socket.sendInBuilding(buildingFetched._id, new socket.Message("newTrash", {
                categoryName : category.name,
                user : user._id
            }))
            if(newLevel) {
               socket.sendToUser(user._id, new socket.Message("newLevel", user.level)) 
            }
            if(rewardsUnlocked.length != 0) {
                socket.sendToUser(user._id, new socket.Message("newRewards", rewardsUnlocked))
            }
            //socket.io.webSocket.to("room/"+buildingFetched._id).emit('newTrash', category.name)
        }) //all ok, return no content means that the trash is added into the db
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
                trashCategory : trashCategory,
                quantity : 0
            }
        } else { //otherwise, return the trash collected loaded from db
            return trashCollected
        }
    })
}
exports.listUserTrashes = function(req, res) {
    let trashCategories = cache.trashCategories.elements
    fetchQueries.searchUserTrashes(res.locals.userAuth, res.locals.filterBuilder)
        .then(collectedTrashes => createResponseArray(trashCategories, collectedTrashes))
        .then(collectedTrashes => res.setOk(collectedTrashes))
        .catch(err => errorHandler(err, res))
}
