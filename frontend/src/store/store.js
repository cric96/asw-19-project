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
        signUp({ commit }, user) {
            return usersApi.create_user(user).then((user)=>{
                return this.dispatch('signIn');
            })
        },
        signInAndUpdate({ commit }, user) {
            let firebaseUser = fb.auth.currentUser
            return new Promise((resolve, reject)=>{
                firebaseUser.getIdToken(true).then(token => {
                    if(token){
                        commit('setToken', token);
                        usersApi.update_user(user).then(updatedUser=>{
                            commit('setUserProfile', updatedUser);
                            resolve(updatedUser)
                        }).catch((err)=>{
                            reject(err);
                            this.dispatch('logout');
                        })
                    }else{
                        reject();
                        this.dispatch('logout');
                    }
                })
            })
        },
        signIn({ commit }) {
            let firebaseUser = fb.auth.currentUser
            return new Promise((resolve, reject)=>{
                firebaseUser.getIdToken(true).then(token => {
                    if(token){
                        commit('setToken', token);
                        usersApi.get_user().then(user=>{
                            commit('setUserProfile', user);
                            resolve(user)
                        }).catch((err)=>{
                            reject(err);
                            this.dispatch('logout');
                        })
                    }else{
                        reject();
                        this.dispatch('logout');
                    }
                })
            })
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
            return fb.auth.currentUser!=null;
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
