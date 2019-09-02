import Vue from 'vue'
import Vuex from 'vuex'
import buildingModule from './module/building.js'
import fb from '@/firebaseConfig.js'
import usersApi from '../services/users.api.js'
import User from '@/model/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        building: buildingModule
    },
    state: {
        token: null,
        userProfile: null
    },
    actions: {
        autoSignIn({ commit }, data) {
            commit('setUserProfile', (!data) ? null : data);
        },
        signIn({ commit }, payload) {
            commit('setUserProfile', payload);
        },
        logout() {
            fb.auth.signOut();//.then(() => { this.dispatch('clearData'); }, error => { });        
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
        },
        setUserFirebase(state, val) {
            state.userFirebase = val;
        }
    }
})

export default store
