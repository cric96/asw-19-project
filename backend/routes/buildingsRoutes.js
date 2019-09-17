var router = require("express").Router();
var buildingsController = require('../controllers/buildingsController');
var auth = require('./middleware/authMiddleware');
var validateObjectId = require('./middleware/objectIdMiddleware');
var userValidation = require("./middleware/userValidationMiddleware")
var cityFetching = require("./middleware/fetchCityMiddleware")

//TODO ricordati di aggiungere il cambio di ownership
router.route('/buildings')
	.get(auth, buildingsController.listBuildings)
	.post(auth, cityFetching, buildingsController.createBuildings);

router.route('/buildings/:id')
	.get(auth, validateObjectId, buildingsController.readBuilding)
	.put(auth, validateObjectId, cityFetching, buildingsController.updateBuilding)
	.delete(auth, validateObjectId, buildingsController.deleteBuilding)

router.route('/users/:userId/buildings')
	.get(auth, userValidation, buildingsController.getBuildingsOfUser)

module.exports = router