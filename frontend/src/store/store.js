/* eslint-disable no-empty-pattern */
import Vue from 'vue'
import Vuex from 'vuex'
import buildingModule from './module/building'
import trashCategoriesModule from './module/trashCategory'
import fb from '@/firebaseConfig.js'
import usersApi from '../services/users.api.js'
import User from '../model/user'
import messagesPlugin from '../plugins/messages'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [messagesPlugin],
    modules: {
        building: buildingModule,
        trashCategories : trashCategoriesModule
    },
    state: {
        token: null,
        userProfile: undefined,
    },
    actions: {
        updateUserData({}, user) {
           return usersApi.updateUser(user)
            // TODO: move to right module
        },
        autoSignIn() {
            return this.dispatch('signIn')
        },
        signUp({}, user) {
            return usersApi.createUser(user).then(() => {
                return this.dispatch('signIn')
            }).catch(err => {
                this.dispatch('logout')
                return Promise.reject(err)
            })
        },
        signInAndUpdate({ commit }, userToUpdate) {
            return this.dispatch('signIn').then((user)=>{
                userToUpdate._id = user._id
                return usersApi.updateUser(userToUpdate)
            }).then(updatedUser => {
                commit('setUserProfile', updatedUser)
                return updatedUser
            }).catch((err)=>{
                this.dispatch('logout')
                return Promise.reject(err)
            })
        },
        signIn({ commit }) {
            return retrieveFirebaseCurrentUser().then(firebaseUser => {
                if(firebaseUser) return firebaseUser.getIdToken(true).then(token => [firebaseUser, token])
                return Promise.reject()
            }).then(([firebaseUser, token]) => {
                if(token) {
                    console.log(token)
                    commit('setToken', token)
                    return usersApi.getUser(firebaseUser.uid)
                } else return Promise.reject()
            }).then(user => {
                commit('setUserProfile', user)
                return Promise.resolve(user)
            }).catch(err => {
                this.dispatch('logout')
                return Promise.reject(err)
            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                fb.auth.signOut().then(() => { this.dispatch('clearData'); resolve() }, () => { reject() })        
            })
        },
        clearData({ commit }) {
            commit('setToken', null)
            commit('setUserProfile', null)
        }
    },
    getters: {
        isAuthenticated(state, getters) {
            return !getters.isUserLoading && state.userProfile != null
        },
        userProfile(state) {
            return state.userProfile
        },
        isUserLoading(state) { // true if the user info are not already fetched
            return state.userProfile === undefined
        },
        token(state){
            return state.token
        },
        currentUser(state) {
            return User.fromJson(state.userProfile)
        }
    },
    mutations: {
        setToken(state, val) {
            state.token = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        updateScore(state, score) {
            state.userProfile.score += score
        }
    }
})

function retrieveFirebaseCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsub = fb.auth.onAuthStateChanged(firebaseUser => {
            unsub()
            resolve(firebaseUser)
        })
    })
}

export default store
