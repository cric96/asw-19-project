var mongoose = require('mongoose')
var errorHandler = require("./errorManagement")
var CollectedBin = require("./collectedBin")
var trashFetching = require("./trashFetch")
function keyOf(element) {
    return element._id.toString()
}
function groupByBin(trashes) {
    let binMap = new Map()
    for(trash of trashes) {
        if(!binMap.has(keyOf(trash.bin))) {
            binMap.set(keyOf(trash.bin), new CollectedBin(trash.bin))
        }
        binMap.get(keyOf(trash.bin)).pushTrash(trash.trashCategory, trash.count)
    }  
    return Array.from(binMap.values())
}

exports.getBinStatus = function(req, res) {	
    
    trashFetching.binsFetch(req,res)
        .then(groupByBin)
        .then(collectedTrashes => res.setOk(collectedTrashes))
        .catch(err => errorHandler(err, res))
}
