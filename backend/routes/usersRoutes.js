var router = require("express").Router();
var usersController = require('../controllers/usersController');
var auth = require('../authMiddleware');

router.route('/users')
    .post(usersController.create_user)
    .get(auth, usersController.get_all_users);

router.route('/users/:id')
    .get(auth, usersController.get_user)
    .put(auth, usersController.update_user)

module.exports = router;