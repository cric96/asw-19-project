var router = require("express").Router();
var binController = require('../controllers/binController');
var auth = require('./middleware/authMiddleware');
var buildingFetching = require("./middleware/fetchBuildingMiddleware")

router.route('/buildings/:id/bins')
    .get(auth, buildingFetching, binController.getBinStatus)

module.exports = router;