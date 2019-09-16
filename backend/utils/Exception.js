/**
 * Exception launched at runtime, it has a error code and optionally a error message
 */
module.exports =  class Exception {
    constructor(code, msg = "") {
        this.code = code
        this.msg = msg
    }
}