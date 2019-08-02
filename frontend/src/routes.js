import Movies from './components/Movies.vue'
import MoviesCrud from './components/MoviesCrud.vue'


const routes = [
    { path: '/', component: Movies },
    { path: '/movies-crud', component: MoviesCrud }
];

export default routes