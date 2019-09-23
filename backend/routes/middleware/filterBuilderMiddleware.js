var mongoose = require('mongoose');
var FilterBuilder = require("../../utils/AndFilterBuilder")
/**
 * find city by cap passed throw the body or by req.
 * the city fetched is in res.locals.cityFetched
 */
module.exports = function(req, res, next) {
    res.locals.filterBuilder = new FilterBuilder
    next()
} 