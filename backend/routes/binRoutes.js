var router = require("express").Router();
var binController = require('../controllers/binController');
var auth = require('./middleware/authMiddleware');
var buildingFetching = require("./middleware/fetchBuildingMiddleware")
var validateObjectId = require('./middleware/objectIdMiddleware');

router.route('/buildings/:id/bins')
    .get(auth, validateObjectId, buildingFetching, binController.getBinStatus)

module.exports = router;