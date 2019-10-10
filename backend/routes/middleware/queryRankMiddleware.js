var utils = require("../../utils/utils")
var httpCode = require("../../utils/httpCode")
var errorHandler = require("../../utils/errorManagement")
var Exception = require("../../utils/Exception")
const ASC = 1
const DESC = -1
function getLimitFromQuery(query) {
    if(query.limit === undefined || utils.isNumeric(query.limit)) {
        return query.limit === undefined ? 0 : parseInt(query.limit)
    } else {
        throw new Exception(httpCode.BAD_REQUEST, "page must be a numeric")
    }
}

function getSortFromQuery(query) {
    if(query.sort === 'asc' || query.sort === 'desc') {
        return query.sort === 'asc' ? ASC : DESC
    } else if(query.sort === undefined) {
        return ASC
    } else {
        throw new Exception(httpCode.BAD_REQUEST, "sort must be asc or desc")
    }
}
module.exports = function(req, res, next) {
    let query = req.query
    if(req.query.orderBy === undefined) {
        res.setBadRequest("You must pass orderBy clausole")
        return 
    }
    Promise.resolve()
        .then(() => res.locals.limit = getLimitFromQuery(query))
        .then(() => res.locals.sort = getSortFromQuery(query))
        .then(() => next())
        .catch(err => errorHandler(err, res))
} 