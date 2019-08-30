import Vue from 'vue'
import Vuex from 'vuex'
import buildingModule from './module/building.js'
import fb from '@/firebaseConfig.js'
import usersApi from '../services/users.api.js'
import User from '@/model/user'

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
    console.log('onAuthStateChanged');
    console.log(user);
    if(user && !store.getters.isAuthenticated) {
        store.dispatch('login');
        
    } else {
        store.dispatch('logout');
    }
});
/*
fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.commit('setIsAuthenticated', true)
        fb.auth.currentUser.getIdToken(true).then(function(token){
            if(token){
                store.commit('setToken', token)
                store.dispatch('fetchUserProfile')
            }
        });
    }else{
        store.commit('setIsAuthenticated', false)
        store.commit('setToken', null)
    }
});*/

const store = new Vuex.Store({
    modules: {
        building: buildingModule
    },
    state: {
        token: null,
        userProfile: null
    },
    actions: {
        login({ commit }) {
            fb.auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(token) {
                if(token) {
                    commit('setToken', token);
                    usersApi.get_user().then(function(res) {
                        commit('setUserProfile', User.fromJson(res.data));
                        this.$router.replace("/dashboard");
                    });
                }
            });
        },
        logout() {
            fb.auth.signOut().then(() => { this.dispatch('clearData'); }, error => { });        
        },
        clearData({ commit }) {
            commit('setToken', null);
            commit('setUserProfile', null);
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.userProfile !== null && state.userProfile !== undefined;
        },
        token(state){
            return state.token;
        }
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
        },
        setUserProfile(state, val) {
            state.userProfile = val;
        }
    }
})

export default store
