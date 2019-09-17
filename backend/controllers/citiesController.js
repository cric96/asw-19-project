var mongoose = require('mongoose');
var City = mongoose.model('City');
var Bin = mongoose.model('Bin')
//REMEMBER, when you exec filter query (with find and some constraints) 
//if the query not found element, mongo return null! use res.setOkIfNotNull or 
//res.setCreatedIfNotNull
const capLength = 5
function isNumeric(num){
	return !isNaN(num)
}
function fillCapWithZero(cap, digitsToFillCap) {
	return cap * (Math.pow(10, digitsToFillCap))
}
const createCapFilter = function(capString) {
	let digits = capString.length
	if(!isNumeric(capString) || digits == 0 || digits > capLength) {
		return {}
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
			cap : {
				$gte : lowerCap,
				$lte : upperCap
			}
		}
	}
}
exports.listCities = function(req, res) {
	let filter = req.query.filter === undefined ? "" : req.query.filter
	console.log(filter)
	//TODO aggiungi il cap nelle regex
	let filterQuery = {
		$or : [
			{		
				name : {
					$regex: filter , "$options": "i" 
				}
			},
			createCapFilter(filter)
		]
		
	}
	
	City.find(filterQuery)
		.exec()
		.then(cities => res.setOk(cities))
		.catch(err => res.setInternalError(err))
};
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
};
exports.getBinCategories = function(req, res) {
	let binCategories = res.locals.cityFetched.binCategories
	res.setOk(binCategories.map(binCategory => binCategory.toJSON()))
}






