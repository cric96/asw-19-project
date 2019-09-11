var mongoose = require('mongoose');
var City = mongoose.model('Cities');
//REMEMBER, when you exec filter query (with find and some constraints) 
//if the query not found element, mongo return null! use res.setOkIfNotNull or 
//res.setCreatedIfNotNull
exports.list_cities = function(req, res) {
	City.find()
		.exec()
		.then(cities => res.setOk(cities))
		.catch(err => res.setInternalError(err))
};
//WHO can create city??
exports.create_city = function(req, res) {
	var city = new City(req.body)
	var error = user.validateSync();
    if(error) {
		res.setBadRequest()
	} else {
	}
}

exports.read_city = function(req, res) {
	City.find({cap : req.params.cap})
		.exec()
		.then(city => res.setOkIfNotNull(city, "City doesn't found"))
		.catch()
};






