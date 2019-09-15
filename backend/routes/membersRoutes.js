var router = require("express").Router();
var membersController = require("../controllers/membersController")
var objectIdValidation = require("./middleware/objectIdMiddleware")
var buildingFetching = require("./middleware/fetchBuildingMiddleware")
var auth = require("./middleware/authMiddleware")
router.route('/buildings/:id/members')
    .post(auth, objectIdValidation, buildingFetching, membersController.add_building_member)
    .get(auth, objectIdValidation, buildingFetching, membersController.get_building_members);
/**
 * route to manage single member in the building, the member id is its firebase uid
 */
router.route('/buildings/:id/members/:memberId')
    .delete(auth, objectIdValidation, buildingFetching, membersController.delete_building_member);
    
module.exports = router;