var httpCode = require("../httpCode")
const MONGO_DB_DUPLICATE = 11000

//map each code with the setting action in express result, it is used to allow the default message when msg is empty
let mapErrorCodeToFunction = function(error, res) {
    switch (error.code) {
        case httpCode.BAD_REQUEST:
            error.msg == '' ? res.setBadRequest() : res.setBadRequest(error.msg)
        break
        case httpCode.NOT_FOUND:
            error.msg == '' ? res.setNotFound() : res.setNotFound(error.msg)
        break
        case httpCode.FORBIDDEN:
            error.msg == '' ? res.setForbidden() : res.setForbidden(error.msg)
        break
        case httpCode.NOT_AUTHORIZED:
            error.msg == '' ? res.setNotAuthorized() : res.setNotAuthorized(error.msg)
        break
        case httpCode.CONFLICT:
            error.msg == '' ? res.setConflict() : res.setConflict(error.msg)
        break
        case MONGO_DB_DUPLICATE:
            res.setConflict(error.errmsg)
        default:
            res.setInternalError(error)
    } 
}
/**
 * Standard way to manage error.
 * You can attach this callback in each mongodb promise in catch:
 *  var errorHandler = require([file path])
 *  User.find()
 *      ...
 *  .catch(err => errorHandler(err, res))
 * in promise chain, when there is an error, a way to manage it is to
 * throw an excpetion with the error code and optionally the message:
 *   if(someConstraint) {
 *      throw new Exception(httpCode.[a code], msg)
 *   }
 * this exception will be catch and handle by this function
 *
 */
module.exports = function(error, res) {
    console.log(error) //to remove
    if(error.code) { //if there is error code defined, use function that map each code to result setting
        mapErrorCodeToFunction(error, res)
    } else {
        res.setInternalError("Internal error:" + error) //general error, puth in internal error
    }
}