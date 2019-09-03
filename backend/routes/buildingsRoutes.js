var router = require("express").Router();
var buildingsController = require('../controllers/buildingsController');
var auth = require('../authMiddleware');

router.route('/buildings')
	//.get(auth, buildingsController.list_buildings)
	.post(auth, buildingsController.create_buildings);

/*router.route('/buildings/:id')
	.get(auth, buildingsController.read_building)
	.put(auth, buildingsController.update_building)
    .delete(auth, buildingsController.delete_building);
    
router.route('/buildings/:id/members')
    .post(auth, buildingsController.add_building_member)
    .get(auth, buildingsController.get_building_members);

router.route('/buildings/:id/members/:memberId')
    .delete(auth, buildingsController.delete_building_member);*/


module.exports = router