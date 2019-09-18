var httpCode = require("../httpCode")
var Exception = require("./Exception")
module.exports.exclude = function(obj, ...fields) {
    fields.forEach(field => {
        delete obj[field] 
    });
    return obj;
}
module.exports.sameMongoId = function(id1, id2) {
    return id1.toString() == id2.toString()
}
/**
 * it is used in query support, il element is null throw new Exception(NOT_FOUND, msg)
 * otherwise return the element.
 * you can use in the chain in two ways:
 *  promise.then(filterNullElement) <-- you can pass a message
 * or:
 *  promise.then(element => filterNullElement(element, "X not found"))
 */
module.exports.filterNullElement = function(element, msg = "") {
    if(element == null) {
        throw new Exception(httpCode.NOT_FOUND, msg)
    } else {
        return element
    }
}