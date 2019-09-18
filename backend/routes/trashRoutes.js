var router = require("express").Router()
var trashesController = require('../controllers/trashesController')
var auth = require('./middleware/authMiddleware')
var validation = require('./middleware/objectIdMiddleware')
var buildingFetching = require("./middleware/fetchBuildingMiddleware")
router.route('/buildings/:id/trashes')
    .post(auth, validation, buildingFetching, trashesController.insertTrash)

router.route('/users/:id/trashes')
    .get(auth, trashesController.getUserTrashes)

module.exports = router;