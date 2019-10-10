
var mongoose = require('mongoose');
var utils = require("../utils/utils")
var TrashCategory = mongoose.model('TrashCategory')
var Reward = mongoose.model('Reward')
var trashQuery = require("../controllers/trashQueries")
/**
 * the base class used to manage cache
 */
class BaseCache {
    /**
     * @param {*} mongoSchema: the schema associated to the elements you want to cache 
     */
    constructor(mongoSchema) {
        this.elements = []
        this.mongoSchema = mongoSchema
    }
    /**
     * invalidate the cache and gets the new values from 
     * mongodb.
     * return the promise that complete when the new values are retrived
     */
    invalidate() {
        return this.mongoSchema.find().then(elements => this.elements = elements)
    }
    /**
     * find the element store in the cache, with the same id passed
     * @param {*} id: the mongodb id of element
     */
    findById(id) {
        return this.elements.find(element => utils.sameMongoId(element._id,id)) 
    }
}
/*
 * cache the trash categories store into the db.
 */
class CacheTrashCategory extends BaseCache {
    constructor() {
        super(TrashCategory)
    }
    /**
     * find the trash category, with the name passed
     */
    findByName(name) {
        return this.elements.find(category => category.name === name)
    }
}
/**
 * export the cache of trash categories.
 */
module.exports.trashCategories = new CacheTrashCategory()

class CacheReward extends BaseCache {
    constructor() {
        super(Reward)
    }

    getUnlockedByUser({_id,rewards,score,level}) {
        let toUnlock = this.getRewardToUnlock(rewards)
        let unlockByScore = this.getUnlockedByScore()
    }

    getRewardToUnlock(userRewards) {
        this.elements.filter(reward => {
            return ! userRewards.find(userReward => utils.sameMongoId(reward._id, userReward._id))
        })
    }

    getUnlockedByScore(score, rewards) {
        return rewards.filter(reward => reward.aboutScore())
                    .filter(reward => reward.unlockData.score < score)
    }

    getUnlockedByLevel(level, rewards) {
        return rewards.filter(reward => reward.aboutLevel())
            .filter(reward => reward.unlockData.level < level)
    }

    getUnlockedByTrash(user, rewards) {
        trashQuery.searchUserTrashes(user)
            .then(collectedTrashes => {

            })
    }
}

/**
 * export the cache of rewards.
 */
module.exports.rewards = new CacheReward()
/**
 * refresh the cache of elements stored in the backed
 * return a promise that complete when all elements are refreshed
 */
module.exports.refresh = function() {
    return Promise.all([
        module.exports.trashCategories.invalidate(), 
        module.exports.rewards.invalidate()
    ]).then(() => console.log("Cache reloaded"))
}
const dayInMilliseconds = 1000 * 60 * 60 * 24
module.exports.daily = function() {
    setInterval(this.refresh, dayInMilliseconds)
}
