var router = require("express").Router()
var usersController = require('../controllers/userController')
var pictureController = require('../controllers/pictureController')
var auth = require('./middleware/authMiddleware')
var userValidation = require("./middleware/userValidationMiddleware")
var imageMiddleware = require("./middleware/imageFromUserMiddleware")

router.route('/users')
    .post(usersController.createUser)
    .get(auth, usersController.listUsers);

router.route('/users/:userId')
    .get(auth, userValidation, usersController.getUser)
    .put(auth, userValidation, usersController.updateUser)

router.route('/users/:userId/picture')
    .post(auth, userValidation, imageMiddleware, pictureController.insertUserAvatar)
    .get(imageMiddleware, pictureController.getPicture)

module.exports = router;