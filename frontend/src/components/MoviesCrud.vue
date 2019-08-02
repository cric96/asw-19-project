<template>
<div id="crud-movies-app" class="container-fluid">
	<h1>CRUD Movies</h1>
	<div class="row">
		<div class="col">
			<button @click.prevent="showAddMovie" type="button" class="btn btn-success"><i class="fas fa-plus"></i> Add Movie</button>
		</div>
	</div>
	<div class="row" v-if="adding">
		<div class="col">
			<form>
				<div class="form-group">
					<label for="title">Title</label>
					<input v-model="new_movie.title" type="text" class="form-control" id="title" placeholder="Enter title">
				</div>
				<div class="form-group">
					<label for="overview">Overview</label>
					<textarea v-model="new_movie.overview"  class="form-control" id="overview">
					</textarea>
				</div>
				<div class="form-group">
					<label for="homepage">Homepage</label>
					<input v-model="new_movie.homepage" type="text" class="form-control" id="homepage" placeholder="Enter homepage link">
				</div>
				<div class="form-group">
					<label for="poster">Poster link</label>
					<input v-model="new_movie.poster_path" type="text" class="form-control" id="poster" placeholder="Enter poster link">
					<img v-bind:src=new_movie.poster_path alt="" />
				</div>
				<div class="form-group">
					<label for="release">Release date</label>
					<input v-model="new_movie.release_date" type="date" class="form-control" id="release" >
				</div>
				<button @click.prevent="addMovie" type="submit" class="btn btn-primary">Submit</button>
				<button @click.prevent="cancelAddMovie" type="submit" class="btn btn-danger">Cancel</button>
				
			</form>
		</div>
	</div>
	<div class="row">
		<div class="col">
		<MoviesTable :movies="movies" delete_enabled @clickDeleteMovie="deleteMovie" modify_enabled @clickEditMovie="editMovie"/>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
import MoviesTable from './MoviesTable'

export default {
	name: 'MoviesCrud',
	components: {
		MoviesTable
	},
    data() {
		return {
			movies: [],
			new_movie: {
						"title" : "", 
						"overview" : "", 
						"homepage" : "", 
						"poster_path" : "", 
						"release_date" : new Date().toISOString().slice(0,10), 
			},
			adding: false
		}
	},
	methods: {
		editMovie: function(movie_id) {
			alert('Editing movie with id' + movie_id);
		},
		addMovie: function(){
			axios.post('http://localhost:3000/api/movies', this.new_movie)
				//.then(response => (console.log(response.data)))
				.then(response => {
					this.movies.push(response.data);
					this.cancelAddMovie();
				});
		},
		showAddMovie: function(){
			this.adding = true;
		},
		cancelAddMovie: function(){
			this.adding = false;
			this.resetNewMovie();
		},
		deleteMovie: function(_id){
			axios.delete('http://localhost:3000/api/movies/'+_id)
				.then(() => {
					this.movies.splice(this.movies.findIndex(item => item._id === _id), 1)
				});
		},
		resetNewMovie: function(){
			this.new_movie = {
					"title" : "", 
					"overview" : "", 
					"homepage" : "", 
					"poster_path" : "", 
					"release_date" : new Date(), 
					}
		},
		listMovies: function () {
			axios.get("http://localhost:3000/api/movies")
			.then(response => (this.movies = response.data));
			
		}
	},
    mounted(){
		this.listMovies();
	},
	filters: {
		limit: function(text, length) {
			return text.substring(0, length); 
		}
	}
}
</script>
