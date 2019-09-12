import trashCategoriesApi from '@/services/mockApiCategories'

export default {
    namespaced: true,
    state: {
        trashCategories: [] 
    },
    getters: {
        categories(state) {
            return state.trashCategories;
        },
        areLoaded(state) {
            return state.trashCategories.length != 0
        }
    },
    actions: {
        fetchCategories({ commit }) {
            return trashCategoriesApi.getCategories()
            .then(categories => commit('setCategories', categories))
        },
        categoryByName({getters}, name) {
            return getters.categories.find(category => category.name == name)
        }
    },
    mutations: {
        setCategories(state, categories) {
            state.trashCategories = categories
        }
    }
};