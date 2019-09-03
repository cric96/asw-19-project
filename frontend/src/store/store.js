/* eslint-disable no-empty-pattern */
import Vue from 'vue'
import Vuex from 'vuex'
import buildingModule from './module/building.js'
import fb from '@/firebaseConfig.js'
import usersApi from '../services/users.api.js'
import User from '../model/user'

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
        updateUserData({}, user) {
            return usersApi.update_user(user);
            // TODO: move to right module
            /*  return new Promise((resolve) => {
                resolve();
            });*/
        },
        autoSignIn() {
            return this.dispatch('signIn');
        },
        signUp({}, user) {
            return usersApi.create_user(user).then(()=>{
                return this.dispatch('signIn');
            }).catch((err) => {
                console.log(err)
                reject(err)
                this.dispatch('logout');
            });
        },
        signInAndUpdate({ commit }, userToUpdate) {
            return this.dispatch('signIn').then((user)=>{
                userToUpdate._id = user._id;
                return usersApi.update_user(userToUpdate)
            }).then(response => {
                commit('setUserProfile', response.data);
                return response.data
            }).catch(()=>{
                this.dispatch('logout');
            })
        },
        signIn({ commit }) {
            return new Promise((resolve, reject)=>{
                retrieveFirebaseCurrentUser(firebaseUser => {
                    if(firebaseUser) {
                        firebaseUser.getIdToken(true).then(token => {
                            if(token){
                                commit('setToken', token);
                                usersApi.get_user().then(response => {
                                    commit('setUserProfile', response.data);
                                    resolve(response.data)
                                }).catch((err)=>{
                                    reject(err);
                                    this.dispatch('logout');
                                })
                            }else{
                                reject();
                                this.dispatch('logout');
                            }
                        });
                    }
                });
            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                fb.auth.signOut().then(() => { this.dispatch('clearData'); resolve(); }, () => { reject(); });        
            });
        },
        clearData({ commit }) {
            commit('setToken', null);
            commit('setUserProfile', null);
        }
    },
    getters: {
        isAuthenticated() {
            return fb.auth.currentUser!=null;
        },
        token(state){
            return state.token;
        },
        currentUser(state) {
            return User.fromJson(state.userProfile);
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

function retrieveFirebaseCurrentUser(cb) {
    const unsub = fb.auth.onAuthStateChanged(firebaseUser => {
        unsub();
        cb(firebaseUser);
    })
}

export default store
