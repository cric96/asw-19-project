var router = require("express").Router();
var trashesController = require('../controllers/trashesController');
var auth = require('../authMiddleware');

router.route('/buildings/:building_id/trashes')
    .post(trashesController.insert_trash)

module.exports = router;