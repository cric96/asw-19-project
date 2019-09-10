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
        this.setResponse(500, msg)
    }

    express.response.setNotFound = function(msg = "Not found") {
        this.setResponse(404, msg)
    }

    express.response.setForbidden = function(msg = "Forbidden") {
        this.setResponse(403, msg)
    }

    express.response.setNotAuthorized = function(msg = "Not authorized") {
        this.setResponse(401, msg)
    }

    express.response.setBadRequest = function(msg = "Bad request") {
        this.setResponse(400, msg)
    }

    express.response.setConflict = function(msg = "Conflict") {
        this.setResponse(409, msg)
    }

    express.response.setCreated = function(responseBody) {
        this.setResponse(201, responseBody)
    }

    express.response.setOk = function(responseBody) {
        this.setResponse(200, responseBody)
    }

    express.response.setNoContent = function() {
        this.setResponse(204, "")
    }
}