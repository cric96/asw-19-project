var router = require("express").Router();
var usersController = require('../controllers/userController');
var auth = require('./middleware/authMiddleware');
var userValidation = require("./middleware/userValidationMiddleware")

router.route('/users')
    .post(usersController.createUser)
    .get(auth, usersController.listUsers);

router.route('/users/:userId')
    .get(auth, userValidation, usersController.getUser)
    .put(auth, userValidation, usersController.updateUser)

module.exports = router;