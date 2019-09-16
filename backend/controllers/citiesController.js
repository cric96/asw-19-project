var mongoose = require('mongoose');
var City = mongoose.model('City');
var Bin = mongoose.model('Bin')
//REMEMBER, when you exec filter query (with find and some constraints) 
//if the query not found element, mongo return null! use res.setOkIfNotNull or 
//res.setCreatedIfNotNull
exports.listCities = function(req, res) {
	let filter = req.query.filter === undefined ? "" : req.query.filter
	console.log(filter)
	//TODO aggiungi il cap nelle regex
	let filterQuery = {
		name : {
			$regex: filter , "$options": "i" 
		}
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
	//TODO
	res.setOk(res.locals.cityFetched.binCategories)
}






