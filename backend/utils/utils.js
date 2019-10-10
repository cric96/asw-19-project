var httpCode = require("./httpCode")
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

module.exports.isNumeric = function(value) {
    return !isNaN(value)
}
/**
 * a shorthand to if statement, if you want to avoid to
 * write these sentece:
 * if(cond) { something } else { something else}
 * with is you can do these with a chain:
 * is(cond).then( something ).catch(something else)
 */
module.exports.is = function(condition) {
    if(typeof condition !== "boolean") {
        throw Exception("Wrong condition statement")
    }
    return new Promise((accept, reject) => condition ? accept() : reject())
}