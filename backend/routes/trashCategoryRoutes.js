var router = require("express").Router();
var trashCategoryController = require('../controllers/trashCategoryController')
router.route('/trashCategories')
	.get(trashCategoryController.listTrashCategories)

module.exports = router