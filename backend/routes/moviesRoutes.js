var router = require("express").Router();
var moviesController = require('../controllers/moviesController');

router.route('/movies')
	.get(moviesController.list_movies)
	.post(moviesController.create_movie);

	
router.route('/movies/:id')
	.get(moviesController.read_movie)
	.put(moviesController.update_movie)
	.delete(moviesController.delete_movie);

module.exports = router