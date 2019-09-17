var mongoose = require('mongoose')
var City = mongoose.model("City")
var Bin = mongoose.model("Bin")
var errorHandler = require("./errorManagement")
var trashFetching = require("./trashFetch")
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

function keyOf(element) {
    return element._id.toString()
}

/**
 * given the result from aggregate query,
 * this function gruop elements by bin id 
 * @param {*} trashes the query result
 */
function groupByBin(trashes) {
    let binMap = new Map()
    for(trash of trashes) {
        if(!binMap.has(keyOf(trash.bin))) {
            binMap.set(keyOf(trash.bin), new BuildingBin(trash.bin))
        }
        binMap.get(keyOf(trash.bin)).putTrash(trash.trashCategory, trash.count)
    }  
    return Array.from(binMap.values())
}

function populateEachBin(trashes, binCategories) {
    var bins = []
    for(binCategory of binCategories) {
        let buildingBin = new BuildingBin(binCategory)
        for(trashCategory of binCategory.trashCategories) {
            let collectedTrash = trashes.find(trash => utils.sameMongoId(trash._id, trashCategory._id))
            let trashCount = collectedTrash === undefined ? 0 : collectedTrash.count
            buildingBin.putTrash(trashCategory, trashCount)
        }
        bins.push(buildingBin.toJSON())
    }
    return bins
}
exports.getBinStatus = function(req, res) {
    City.findById(res.locals.buildingFetched.city)
        .populate("binCategories")
        .then(city => city.binCategories)
        .then(binCategories => Bin.populate(binCategories, { path: 'trashCategories' }))
        .then(categories => trashFetching.binsFetch(req, res).then(trashes => populateEachBin(trashes, categories)))
        .then(collectedTrash => res.setOk(collectedTrash))
        .catch(err => errorHandler(err, res))
    /*
    trashFetching.binsFetch(req,res)
        .then(groupByBin) 
        .then(collectedTrashes => res.setOk(collectedTrashes))
        .catch(err => errorHandler(err, res))*/
}
