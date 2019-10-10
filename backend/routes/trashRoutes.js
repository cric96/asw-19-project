var router = require("express").Router()
var trashesController = require('../controllers/trashController')
var filterBuilderMiddleware = require('./middleware/filterBuilderMiddleware')
var dateIntoFilter = require('./middleware/validateDateMiddleware')
var auth = require('./middleware/authMiddleware')
var validation = require('./middleware/objectIdMiddleware')
var buildingFetching = require("./middleware/fetchBuildingMiddleware")

router.route('/buildings/:id/trashes')
    .post(auth, validation, buildingFetching, trashesController.insertTrash)

router.route('/users/:id/trashes')
    .get(auth, 
        filterBuilderMiddleware, //add filterBuilder il locals, able to apply filter into the chain
        dateIntoFilter,
        trashesController.listUserTrashes)

module.exports = router;