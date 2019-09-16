var mongoose = require('mongoose');
var Building = mongoose.model("Building");
/**
 * fetch the building identify by the id
 * it is store in res.locals.buildingFetched
 */
module.exports = function(req, res, next) {
    Building.findById(req.params.id)
        .then(building => {
            if(building == null) {
                res.setNotFound("Building not found")
            } else {
                res.locals.buildingFetched = building
                next()
            }
        })
        .catch(err => res.setInternalError(err))
}