var router = require("express").Router();
var buildingsController = require('../controllers/buildingsController');
var auth = require('./middleware/authMiddleware');
var validateObjectId = require('./middleware/objectIdMiddleware');
var userValidation = require("./middleware/userValidationMiddleware")
var cityFetching = require("./middleware/fetchCityMiddleware")

//TODO ricordati di aggiungere il cambio di ownership
router.route('/buildings')
	.get(auth, buildingsController.list_buildings)
	.post(auth, cityFetching, buildingsController.create_buildings);

router.route('/buildings/:id')
	.get(auth, validateObjectId, buildingsController.read_building)
	.put(auth, validateObjectId, cityFetching, buildingsController.update_building)
	.delete(auth, validateObjectId, buildingsController.delete_building)

router.route('/users/:userId/buildings')
	.get(auth, userValidation, buildingsController.get_buildings_of_user)

/*    
router.route('/buildings/:id/members')
    .post(auth, buildingsController.add_building_member)
    .get(auth, buildingsController.get_building_members);

router.route('/buildings/:id/members/:memberId')
    .delete(auth, buildingsController.delete_building_member);*/


module.exports = router