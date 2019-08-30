import Vue from 'vue'
import Vuex from 'vuex'
import buildingModule from './module/building.js'
import fb from '@/firebaseConfig.js'
import usersApi from '../services/users.api.js'

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.commit('setIsAuthenticated', true)
        fb.auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(token){
            if(token){
                store.commit('setToken', token)
                store.dispatch('fetchUserProfile')
            }
        });
    }else{
        store.commit('setIsAuthenticated', false)
        store.commit('setToken', null)
    }
});

const store = new Vuex.Store({
    modules: {
        building: buildingModule
    },
    state: {
        currentUser: null,
        token: null,
        userProfile: null,
        isAuthenticated: false,
    },
    actions: {
        fetchUserProfile({ commit, state }) {
            /*usersApi.get_user().then(function(res){
                console.log(res.data)
                
            })*/
        },
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setIsAuthenticated', false)
            commit('setToken', null)
        },
        logout() {
                fb.auth.signOut().then(() => {
                this.dispatch('clearData')

              }, function(error) {

            });        
        }
    }, 
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setIsAuthenticated(state, val){
            state.isAuthenticated = val
        },
        setToken(state, val){
            state.token = val
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.currentUser !== null && state.currentUser !== undefined;
        },
        token(state){
            return state.token;
        }
    }    
})

export default store
