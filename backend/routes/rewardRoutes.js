var router = require("express").Router();
var rewardController = require('../controllers/rewardController');
router.route('/rewards')
	.get(rewardController.listRewards)

module.exports = router