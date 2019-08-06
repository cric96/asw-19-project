import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('@/firebaseConfig.js')

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.commit('setIsAuthenticated', true)
        console.log("loggato")
    }else{
        store.commit('setIsAuthenticated', false)
        console.log("uscito")
    }
});

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        isAuthenticated: false,
    },
    actions: {
        fetchUserProfile({ commit, state }) {
            /*fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })*/
        },
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setIsAuthenticated', false)
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
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.currentUser !== null && state.currentUser !== undefined;
        }
    }    
})
