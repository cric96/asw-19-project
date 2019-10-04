var router = require("express").Router();
var binController = require('../controllers/binController');
var auth = require('./middleware/authMiddleware');
var buildingFetching = require("./middleware/fetchBuildingMiddleware")
var validateObjectId = require('./middleware/objectIdMiddleware');
var filterBuilderMiddleware = require('./middleware/filterBuilderMiddleware')
var dateIntoFilter = require('./middleware/validateDateMiddleware')

router.route('/buildings/:id/bins')
    .get(auth, 
        validateObjectId, 
        buildingFetching,
        filterBuilderMiddleware, //add filterBuilder il locals, able to apply filter into the chain
        dateIntoFilter, 
        binController.listBins)

module.exports = router;