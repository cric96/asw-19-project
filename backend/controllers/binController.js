var mongoose = require('mongoose');
var Trash = mongoose.model('Trash')
var User = mongoose.model('User')
var httpCode = require("../httpCode")
var Exception = require("../utils/Exception")
var QueryBuilder = require("../utils/QueryBuilder")
var errorHandler = require("./errorManagement")

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
    if(!areDatesValid(req.query.to, req.query.from)) {
        throw new Exception(httpCode.BAD_REQUEST, "Put timestamp in date field")
    }
    let to = req.query.to === undefined ? new Date() : new Date(req.query.to)
    let from = req.query.from === undefined ? new Date(1) : new Date(req.query.from)
    console.log(from)
    queryBuilder.pushFilter({
        date: {
            $lt : to,
            $gt : from
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

function groupByBin(trashes) {
    let binMap = new Map()
    for(trash in trashes) {
        if(binMap.has(trash.bin._id)) {
            binMap.get(trash.bin._id)
        }
    }
}

const groupCatogoriesAndCount = {
    _id: "$trashCategory",
    count : {
        $sum : 1 //count the trash
    },
    binId: {
        $max:"$bin" //in this context we assume that for a trash category in building there is only one bin for all trash, max it is used to avoid an array on the same bins
    }
}

const lookupBin = {
    from: "bins",
    localField: "binId",
    foreignField: "_id",
    as: "bin"
}

const lookupTrashCategory = {
    from: "trashcategories",
    localField: "_id",
    foreignField: "_id",
    as: "trashCategory"
}

const projection = {
    trashCategory : 1,
    bin : 1,
    count : 1
}

exports.getBinStatus = function(req, res) {	
    queryBuilding(req, res).then(queryBuilder => 
        Trash.aggregate([
            {
                $match : queryBuilder.build() //use filter query create with user, date and building
            },
            {
                $group : groupCatogoriesAndCount //group by the trash category and count the occurences
            },
            {
                $lookup : lookupBin //populate bins
            },
            {
                $lookup : lookupTrashCategory //populate trash category
            },
            //lookup return always an array, even if you have only one element, unwind convert an array to a single element
            {
               $unwind : "$bin" 
            },
            {
                $unwind : "$trashCategory"
            },
            {
                $project : projection
            }
            
        ])
    )
    .then(collectedTrashes => res.setOk(collectedTrashes))
    .catch(err => errorHandler(err, res))
}
