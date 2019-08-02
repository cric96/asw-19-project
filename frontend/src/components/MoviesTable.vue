<template>
<table class="table responsive">
    <thead class="thead-dark">
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Overview</th>
            <th scope="col">Homepage</th>
            <th scope="col">Poster</th>
            <th scope="col">Release date</th>
            <th v-if="modify_enabled || delete_enabled" scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="movie in movies" :key="movie._id">
            <td>{{ movie.title }}</td>
            <td>{{ movie.overview }}</td>
            <td>{{ movie.homepage }}</td>
            <td><img v-bind:src=movie.poster_path alt="" /></td>
            <td>{{ movie.release_date | limit(10) }}</td>
            <td v-if="modify_enabled || delete_enabled">
                
                <button v-if="delete_enabled" @click.prevent="emitOnModify(movie._id)"  type="button" class="btn btn-sm btn-primary">
                    <i class="fas fa-pen"></i>
                </button>
                <button v-if="modify_enabled" @click.prevent="emitOnDelete(movie._id)" type="button" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: 'MoviesTable',
    props: {
        movies: Array,
        delete_enabled: Boolean, 
        modify_enabled: Boolean
    },
    methods: {
        emitOnDelete: function(movie_id) {
            this.$emit('clickDeleteMovie', movie_id);
        },
        emitOnModify: function(movie_id) {
            this.$emit('clickEditMovie', movie_id);
        }
    },
    filters: {
		limit: function(text, length) {
			return text.substring(0, length); 
		}
	}
}
</script>
