var mongoose = require('mongoose');
var Trash = mongoose.model('Trash')
var User = mongoose.model('User')
var httpCode = require("../httpCode")
var Exception = require("../utils/Exception")
var errorHandler = require("./errorManagement")

class QueryBuilder {
    constructor() {
        this.filters = []
    }

    pushFilter(filter) {
        this.filters.push(filter)
        return this
    }

    build() {
        return {
            $and : this.filters
        }
    }
}
function areDatesValid(from, to) {
    return (from === undefined || isFinite(from)) && (to === undefined || isFinite(to))
}
function queryBuilding(req, res) {
    return new Promise((resolve, reject) => {
        let queryBuilder = new QueryBuilder()
        addFilterDate(req, queryBuilder) //add date filtering (if date are present)
        queryBuilder.pushFilter({
            building : res.locals.buildingFetched._id
        })
        let userId = req.query.userId 
        if(userId === undefined) {
            resolve(queryBuilder)
        } else {
            fetchUser(userId, res.locals.buildingFetched)
                .then(user => {
                    resolve(queryBuilder.pushFilter({
                        user : user.firebase_id
                    }))
                })
                .catch(err => reject(err))
        }
    }) 
}
function addFilterDate(req, queryBuilder) {
    let to = req.query.to === undefined ? Date.now() : new Date(req.query.to)
    let from = req.query.from === undefined ? Date.now() : new Date(req.query.from)
    queryBuilder.pushFilter({
        date: {
            $gte : from,
            $lt : to
        }
    })
}

function fetchUser(firebaseId, buildingFetched) {
    User.findOne({firebase_id : firebaseId})
        .then(user => {
            if(user == null) {
                throw new Exception(httpCode.NOT_FOUND, "User in query not found")
            } else if(! buildingFetched.isUserInBuilding(user)){
                throw new Exception(httpCode.NOT_FOUND, "Member not found in building")
            } else {
                return user
            }
        })
}

exports.getBinStatus = function(req, res) {	
    let groupCatogoriesAndCount = {
        _id : "$trashCategory",
        count : {$sum : 1}
    }
    queryBuilding(req, res).then(queryBuilder => Trash.aggregate([
        {
            $match : queryBuilder.build() //use filter query create with user, date and building
        },
        {
            $group : groupCatogoriesAndCount
        }
    ]))
    .then(collectedTrashes => {
        console.log(collectedTrashes)
        res.setOk(collectedTrashes)
    })
    .catch(err => errorHandler(err, res))
}
