var mongoose = require('mongoose');
var City = mongoose.model("City");
/**
 * find city by cap passed throw the body or by req.
 * the city fetched is in res.locals.cityFetched
 */
module.exports = function(req, res, next) {
    let filterQuery = {
        cap : {
            $in : [req.body.city, req.params.CAP]
        }
    }
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