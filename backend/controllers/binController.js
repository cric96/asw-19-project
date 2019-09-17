var mongoose = require("mongoose");
var trashFetch = require("./trashFetch");
var errorHandler = require("./errorManagement");
var CollectedBin = require("./collectedBin");
var trashFetching = require("./trashFetch");
function groupByBin(trashes) {
  let binMap = new Map();
  for (trash of trashes) {
    if (!binMap.has(trash.bin._id.toString())) {
      binMap.set(trash.bin._id.toString(), new CollectedBin(trash.bin));
    }
    binMap
      .get(trash.bin._id.toString())
      .pushTrash(trash.trashCategory, trash.count);
  }
  console.log(Array.from(binMap.values()));
  return Array.from(binMap.values());
}

exports.getBinStatus = function(req, res) {
  trashFetching
    .binsFetch(req, res)
    .then(groupByBin)
    .then(collectedTrashes => res.setOk(collectedTrashes))
    .catch(err => errorHandler(err, res));
};
