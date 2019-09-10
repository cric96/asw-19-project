var mongoose = require('mongoose');
var City = mongoose.model('Cities');

exports.list_cities = function(req, res) {
	City.find({}, function(err, movie) {
		if (err)
			res.send(err);
		res.json(movie);
	});
};

exports.read_city = function(req, res) {
	
};






