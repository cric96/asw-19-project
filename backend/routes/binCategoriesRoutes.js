var router = require("express").Router();
var binCategoriesController = require('../controllers/binCategoriesController');
var auth = require('../authMiddleware');
var validateObjectId = require('../objectIdMiddleware');
//TODO ricordati di aggiungere il cambio di ownership
router.route('/bin_categories')
	.get(auth, binCategoriesController.list_bin_categories)

module.exports = router