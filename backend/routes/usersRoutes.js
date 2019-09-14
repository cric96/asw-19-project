var router = require("express").Router();
var usersController = require('../controllers/usersController');
var auth = require('./middleware/authMiddleware');
var userValidation = require("./middleware/userValidationMiddleware")

router.route('/users')
    .post(usersController.create_user)
    .get(auth, usersController.get_all_users);

router.route('/users/:userId')
    .get(auth, userValidation, usersController.get_user)
    .put(auth, userValidation, usersController.update_user)

module.exports = router;