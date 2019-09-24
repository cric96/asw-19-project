var mongoose = require('mongoose')
var City = mongoose.model("City")
var Bin = mongoose.model("Bin")
var errorHandler = require("./errorManagement")
var fetchQueries = require("./trashQueries")
var utils = require("../utils/utils")
/**
 * class describe the building's bind.
 * it is used to aggregate the value retrived from query
 * (marshalling)
 */
class BuildingBin {
    constructor(binCategory) {
        this.collectedTrashes = []
        this.binCategory = binCategory
    }
    putTrash(trashCategory, amount) {
        this.collectedTrashes.push({
            trashCategory : trashCategory,
            quantity : amount
        })
    }
    toJSON() {
        binCategory.trashCategories = undefined
        return {
            binCategory : this.binCategory,
            collectedTrashes : this.collectedTrashes
        }
    }
}
/**
 * this function create the bins by the trashes found into a building
 * and by the building's bin categories.
 */
function createBins(trashCollectedInBuilding, binCategories) {
    var bins = [] //the building's bin 
    for(binCategory of binCategories) {
        let buildingBin = new BuildingBin(binCategory)
        for(trashCategory of binCategory.trashCategories) {
            //verify if there is some trashes thrown with this category
            let collectedTrash = trashCollectedInBuilding.find(trash => utils.sameMongoId(trash._id, trashCategory._id))
            //if it is undefined, it means that no trashes is thrown
            let trashCount = collectedTrash === undefined ? 0 : collectedTrash.quantity
            //put the trash count associated with this trash category
            buildingBin.putTrash(trashCategory, trashCount)
        }
        //add populate bins in the building's bin
        bins.push(buildingBin.toJSON())
    }
    return bins
}
exports.listBins = function(req, res) {
    City.findById(res.locals.buildingFetched.city)
        .populate("binCategories") 
        .then(city => city.binCategories)
        .then(binCategories => Bin.populate(binCategories, { path: 'trashCategories' }))
        .then(categories => fetchQueries.searchBuildingTrashes(req, res).then(trashesCollected => createBins(trashesCollected, categories)))
        .then(collectedTrash => res.setOk(collectedTrash))
        .catch(err => errorHandler(err, res))
}
