var router = require("express").Router();
var membersController = require("../controllers/memberController")
var auth = require("./middleware/authMiddleware")

router.route('/ranks/users')
    .get(auth, /*TODO */);

router.route('/ranks/buildings')
    .get(auth, /*TODO */);

router.route('/ranks/cities')
    .get(auth, /*TODO */);

module.exports = router;