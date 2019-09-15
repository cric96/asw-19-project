var router = require("express").Router();
var citiesController = require('../controllers/citiesController');
var auth = require('./middleware/authMiddleware');
var cityFetching = require("./middleware/fetchCityMiddleware")
//TODO ricordati di aggiungere il cambio di ownership
router.route('/cities')
	.get(citiesController.listCities)
	.post(auth, citiesController.createCity);

router.route('/cities/:CAP')
	.get(auth, citiesController.readCity)
 

router.route('/cities/:CAP/binCategories')
	.get(auth, citiesController.getBinCategories)

module.exports = router