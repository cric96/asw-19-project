var router = require("express").Router();
var membersController = require("../controllers/memberController")
//TODO aggiungi il fetch delle date
var auth = require("./middleware/authMiddleware")
var queryRankMiddleware = require("./middleware/queryRankMiddleware")
var rankController = require("../controllers/rankController")

router.route('/ranks/users')
    .get(auth, queryRankMiddleware, rankController.getRankOfUsers);

router.route('/ranks/buildings')
    .get(auth, queryRankMiddleware, rankController.getRankOfBuildings);

router.route('/ranks/cities')
    .get(auth, queryRankMiddleware, rankController.getRankOfCities);

module.exports = router;