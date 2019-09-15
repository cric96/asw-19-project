var mongoose = require('mongoose');
var City = mongoose.model('Cities');
var Bin = mongoose.model('Bin')
//REMEMBER, when you exec filter query (with find and some constraints) 
//if the query not found element, mongo return null! use res.setOkIfNotNull or 
//res.setCreatedIfNotNull
exports.listCities = function(req, res) {
	City.find()
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
	//TODO put populate correct
	Bin.populate(res.cityFetched, )
	res.setOk(res.locals.cityFetched.binCategories)
}






