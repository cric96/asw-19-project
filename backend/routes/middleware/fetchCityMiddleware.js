var City = require("../../models/cityModel");
/**
 * find city by cap passed throw the body.
 * the city fetched is in res.locals.cityFetched
 */
module.exports = function(req, res, next) {
    City.findOne({cap : req.body.city})
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