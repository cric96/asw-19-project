var router = require("express").Router();
var citiesController = require('../controllers/citiesController');
var auth = require('../authMiddleware');
//TODO ricordati di aggiungere il cambio di ownership
router.route('/cities')
	.get(citiesController.list_cities)
	.post(auth, citiesController.create_city);

router.route('/cities/:CAP')
	.get(auth, citiesController.read_city)
 


module.exports = router