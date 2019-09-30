var httpCode = require("./utils/httpCode")
/*
    The function "decore" it is used to decore the express's resut object.
    It enable to make more result (with json response) building more "readable".
    To decore express, you need to write:        
        var express = require('express');
        require("./decore-express").decore(express);
*/
module.exports.decore = (express) => {
    express.response.setResponse = function(httpCode, message) {
        console.log("HTTP-Status: " + httpCode + " Message: " + message);
        return this.status(httpCode).json(message);
    }

    express.response.setInternalError = function(msg = "Internal error") {
        this.setResponse(httpCode.INTERNAL_ERROR, msg)
    }

    express.response.setNotFound = function(msg = "Not found") {
        this.setResponse(httpCode.NOT_FOUND, msg)
    }

    express.response.setForbidden = function(msg = "Forbidden") {
        this.setResponse(httpCode.FORBIDDEN, msg)
    }

    express.response.setNotAuthorized = function(msg = "Not authorized") {
        this.setResponse(httpCode.NOT_FOUND, msg)
    }

    express.response.setBadRequest = function(msg = "Bad request") {
        this.setResponse(httpCode.BAD_REQUEST, msg)
    }

    express.response.setConflict = function(msg = "Conflict") {
        this.setResponse(httpCode.CONFLICT, msg)
    }

    express.response.setCreated = function(responseBody) {
        this.setResponse(httpCode.CREATED, responseBody)
    }

    express.response.setOk = function(responseBody) {
        this.setResponse(httpCode.OK, responseBody)
    }

    express.response.setNoContent = function() {
        this.setResponse(httpCode.NO_CONTENT, "")
    }

    express.response.setOkIfNotNull = function(responseBody, msgNotFound = "Not found") {
        if(responseBody != null) {
            this.setOk(responseBody)
        } else {
            this.setNotFound(msgNotFound)
        }
    }

}