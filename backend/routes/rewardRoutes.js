var router = require("express").Router();
var rewardController = require('../controllers/rewardController')
var rewardImageMiddleware = require('./middleware/imageFromRewardMiddleware')
var pictureController = require('../controllers/pictureController')
router.route('/rewards')
	.get(rewardController.listRewards)

router.route('/rewards/:rewardName/picture')
	.get(rewardImageMiddleware, pictureController.getPicture)
module.exports = router