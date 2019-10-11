
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

    async getUnlockedByUser(user) {
        var toUnlock = this.getRewardToUnlock(user.rewards)
        var rewardsAboutTrash = await this.getUnlockedByTrash(user , toUnlock)
        return rewardsAboutTrash.concat(
            this.getUnlockedByLevel(user.level, toUnlock),
            this.getUnlockedByScore(user.level, toUnlock),
        )
    }

    getRewardToUnlock(userRewards) {
        return this.elements.filter(reward => {
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
    isTrashRewardEligible(reward, collectedTrashes) {
        for(var category of reward.unlockData.categories) {
            var collectedOfCategory = collectedTrashes.find(t => t.trashCategory.name === category)
            var quantityOfCategory = collectedOfCategory.quantity
            if(quantityOfCategory > reward.unlockData.quantity) {
                return true
            }
        }
        return false
    }
    async getUnlockedByTrash(user, rewards) {
        var filteredReward = rewards.filter(r => r.aboutTotalTrash() || r.aboutTrash())
        if(filteredReward.length == 0) { //if there isn't trash rewards to unlock, it is possible to avoid trash query
            return []
        }
        var collectedTrashes = await trashQuery.searchUserTrashes(user)
        var trashQuantity = collectedTrashes.reduce((acc,trash) => acc + trash.quantity, 0)
        return rewards.filter(reward => {
            if(reward.aboutTotalTrash()) {
                return reward.unlockData.quantity < trashQuantity
            } else if(reward.aboutTrash()){
                return this.isTrashRewardEligible(reward, collectedTrashes) 
            } else {
                return false
            }
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
