var router = require("express").Router();
var binController = require('../controllers/binController');
var auth = require('../authMiddleware');

router.route('/buildings/:building_id/bins')
    .post(auth, binController.getBinStatus)

module.exports = router;