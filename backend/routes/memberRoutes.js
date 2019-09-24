var router = require("express").Router();
var membersController = require("../controllers/memberController")
var objectIdValidation = require("./middleware/objectIdMiddleware")
var buildingFetching = require("./middleware/fetchBuildingMiddleware")
var auth = require("./middleware/authMiddleware")
router.route('/buildings/:id/members')
    .post(auth, objectIdValidation, buildingFetching, membersController.addBuildingMember)
    .get(auth, objectIdValidation, buildingFetching, membersController.listBuildingMembers);
/**
 * route to manage single member in the building, the member id is its firebase uid
 */
router.route('/buildings/:id/members/:memberId')
    .delete(auth, objectIdValidation, buildingFetching, membersController.deleteBuildingMember);
    
module.exports = router;