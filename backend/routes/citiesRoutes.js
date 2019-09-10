var router = require("express").Router();
var buildingsController = require('../controllers/buildingsController');
var auth = require('../authMiddleware');
var validateObjectId = require('../objectIdMiddleware');
//TODO ricordati di aggiungere il cambio di ownership
router.route('/cities')
	.get(auth, buildingsController.list_cities)
	.post(auth, buildingsController.create_city);

router.route('/cities/:CAP')
	.put(auth, validateObjectId, buildingsController.read_city)
 


module.exports = router