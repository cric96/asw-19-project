/* eslint-disable no-empty-pattern */
import firebaseAuthService from '@/services/firebaseAuthService'
import usersApi from '../../services/usersApi'
import User from '../../model/user'
import fb from '../../firebaseConfig'
import handleAuthError from '@/resource/authErrors'

export default {
    namespaced: true,
    state: {
        token: null,
        userProfile: undefined
    },
    actions: {
        signInEmailPassword({ commit, dispatch }, {email, password}) {
            console.log(dispatch)
            console.log(email + " " + password)
            return firebaseAuthService.signInFromEmailPassword(email, password)
                .then(userWithToken => {
                    commit('updateToken', userWithToken.token)
                    return dispatch('fetchUserProfile', userWithToken.user.uid)
                })
                .catch(error => {
                    dispatch('logout')
                    throw handleAuthError(error.status || error.code)
                })
        },
        signUp({ dispatch }, {user, password}) {
            return firebaseAuthService.signUpFromEmailPassword(user.email, password)
                .then(firebaseUser => {
                    user.firebase_uid = firebaseUser.uid
                    return usersApi.createUser(user)
                })
                .then(newUser => dispatch('refreshToken').then(() => newUser))
                .catch(error => {
                    dispatch('logout')
                    throw handleAuthError(error.status || error.code)
                })
        },
        logout({ commit }) {
            return firebaseAuthService.logout().then(() => {
                commit('updateToken', null)
                commit('setUserProfile', null)
            })
        },
        refreshToken({ commit }) {
            return firebaseAuthService.retrieveUserToken().then(token => {
                console.log('Token: ' + token)
                commit('updateToken', token)
            })
        },
        fetchUserProfile({ commit }, firebaseUserUid) {
            return usersApi.getUser(firebaseUserUid).then(user => {
                commit('setUserProfile', user)
                return user
            })
        }
    },
    mutations: {
        updateToken(state, val) {
            state.token = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        updateScore(state, score) {
            state.userProfile.score += score
        }
    }
}