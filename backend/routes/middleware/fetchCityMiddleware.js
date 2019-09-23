var mongoose = require('mongoose');
var City = mongoose.model("City");
/**
 * find city by cap passed throw the body or by req.
 * the cap can be in: query, body or params.
 * the city fetched is in res.locals.cityFetched
 */
module.exports = function(req, res, next) {
    let caps = req.body.city === undefined ? [req.params.cap, req.query.cap] : [req.body.city.cap, req.params.cap, req.query.cap]
    let filterQuery = {
        cap : {
            $in : caps
        }
    }
    City.findOne(filterQuery)
        .populate("binCategories")
        .then(city => {
            if(city == null) { 
                res.setNotFound("City not found")
            } else {
                res.locals.cityFetched = city
                next()
            }
        })
        .catch(err => res.setInternalError())
} 