/* eslint-disable no-empty-pattern */
import usersApi from '../../services/usersApi'
import authSubmodule from './auth.js'
import userSubmodule from './userDecorations.js'
/**
 * this store module wrap user funcionality, 
 * it is decored using userDecoration (to add some
 * utility to manage used state) and auth (used to 
 * manage user authorization).
 */
export default {
    namespaced: true,
    state: {
        userProfile: undefined,
        ...userSubmodule.state
    },
    getters: {
        ...authSubmodule.getters,
        ...userSubmodule.getters,
        userProfile(state) {
            return state.userProfile
        },
        isUserLoading(state) {
            return state.userProfile === undefined
        } 
    },
    actions: {
        ...authSubmodule.actions,
        ...userSubmodule.actions,
        // retrieve a user profile from scanbage backend
        fetchUserProfile({ commit }, firebaseUserUid) {
            return usersApi.getUser(firebaseUserUid).then(user => {
                this.emitOnSocket("newUser", user._id)
                commit('setUserProfile', user)
                return user
            })
        },
        updateUserData({commit}, user) {
            return usersApi.updateUser(user).then(updatedUser => {
                commit('setUserProfile', updatedUser)
                return updatedUser
            })
        }      
    },
    mutations: {
        ...userSubmodule.mutations,
        setUserProfile(state, user) {
            this.emitOnSocket('joinUser',user._id)
            state.userProfile = user
        },
        //reset user state
        cleanUser(state) {
            state.userProfile = null
        }
    }
}