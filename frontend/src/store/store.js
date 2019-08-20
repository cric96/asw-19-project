import Vue from 'vue'
import Vuex from 'vuex'
import buildingModule from './module/building.js'
const fb = require('@/firebaseConfig.js')

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.commit('setIsAuthenticated', true)
    }else{
        store.commit('setIsAuthenticated', false)
    }
});

export const store = new Vuex.Store({
    modules: {
        building: buildingModule
    },
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
        },
        logout() {
                fb.auth.signOut().then(() => {
                this.dispatch('clearData')
                this.$router.replace('/intro')
              }, function(error) {
                console.log(error)
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
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.currentUser !== null && state.currentUser !== undefined;
        }
    }    
})
