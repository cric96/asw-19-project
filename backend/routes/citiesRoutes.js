var router = require("express").Router();
var citiesController = require('../controllers/citiesController');
var auth = require('./middleware/authMiddleware');
var cityFetching = require("./middleware/fetchCityMiddleware")
//TODO ricordati di aggiungere il cambio di ownership
router.route('/cities')
	.get(citiesController.listCities)
	.post(auth, citiesController.createCity);

router.route('/cities/:cap')
	.get(auth, cityFetching, citiesController.readCity)
 

router.route('/cities/:cap/binCategories')
	.get(auth, cityFetching, citiesController.getBinCategories)

module.exports = router