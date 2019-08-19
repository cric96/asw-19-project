var router = require("express").Router();
var usersController = require('../controllers/usersController');
var auth = require('../authMiddleware');

router.route('/users')
    .post(usersController.create_user)
    .put(auth, usersController.update_user)
    .get(auth, usersController.get_user);

module.exports = router;