var mongoose = require('mongoose');
var City = mongoose.model('City');

const capLength = 5

function isNumeric(num){
	return !isNaN(num)
}

function fillCapWithZero(cap, digitsToFillCap) {
	return cap * (Math.pow(10, digitsToFillCap))
}

function createCapFilter(capString) {
	let digits = capString.length
	if(!isNumeric(capString) || digits == 0 || digits > capLength) {
		return undefined
	} else {
		let cap = parseInt(capString)
		let digitsToFillCap = (capLength - digits)
		/*
		 * given a number, i wanto an upper bound and a lower bound. for example
		 * the filter is 47 i want a lower bound equal to 47000 and an upper bound
		 * equal to 47999. with these instruction i have this result.
		*/
		let lowerCap = fillCapWithZero(cap, digitsToFillCap)
		let upperCap = fillCapWithZero(cap + 1, digitsToFillCap) - 1
		console.log(lowerCap, upperCap)
		return {
			$gte : lowerCap,
			$lte : upperCap
		}
	}
}

function putLimitIfDefined(query, req) {
	if(isNumeric(req.query.limit)) {
		return query.limit(parseInt(req.query.limit))
	} else {
		return query
	}
}

function createFilterQuery(req) {
	let filter = req.query.filter === undefined ? "" : req.query.filter
	let capFilter = createCapFilter(filter)
	if(capFilter == undefined) {
		return {
			name : {
				$regex: filter , "$options": "i" 
			}
		}
	} else {
		return {
			$or : [
				{
					name : {
						$regex: filter , "$options": "i" 
					}
				}, 
				{	
					cap : capFilter
				}
			]
		}
	}
}
exports.listCities = function(req, res) {
	let filterQuery = createFilterQuery(req)
	putLimitIfDefined(City.find(filterQuery), req)
		.then(cities => res.setOk(cities))
		.catch(err => res.setInternalError(err))
}
//WHO can create city??
exports.createCity = function(req, res) {
	var city = new City(req.body)
	var error = user.validateSync();
    if(error) {
		res.setBadRequest()
	} else {
		
	}
}

exports.readCity = function(req, res) {
	res.setOk(res.locals.cityFetched)
}

exports.listBinCategories = function(req, res) {
	let binCategories = res.locals.cityFetched.binCategories
	res.setOk(binCategories.map(binCategory => binCategory.toJSON()))
}