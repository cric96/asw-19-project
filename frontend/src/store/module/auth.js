/* eslint-disable no-empty-pattern */
import firebaseAuthService from '@/services/firebaseAuthService'
import usersApi from '../../services/usersApi'
import { signInError, signUpError } from '@/resource/authErrors'
import User from '@/model/user'

export default {
    namespaced: true,
    state: {
        userProfile: undefined
    },
    getters: {
        isAuthenticated(state, getters) {
            return !getters.isUserLoading && state.userProfile != null
        },
        userProfile(state) {
            return state.userProfile
        },
        isUserLoading(state) {
            return state.userProfile === undefined
        } 
    },
    actions: {
        // do a sign in using email and password
        signInEmailPassword({ dispatch }, {email, password}) {
            return firebaseAuthService.signInFromEmailPassword(email, password)
                .then(firebaseUser => dispatch('fetchUserProfile', firebaseUser.user.uid))
                .catch(error => {
                    dispatch('logout')
                    throwSignInError(error)
                })
        },
        // sign in using a social provider
        signInSocial({ commit, dispatch }, provider) {
            return firebaseAuthService.signInWithProvider(provider)
                .then(firebaseUser => {
                    if(firebaseUser.additionalUserInfo.isNewUser) { // in this case need to create a new one user on our backend
                        let newUser = extractUserFromSocial(firebaseUser)
                        return createUserProfile(commit, newUser)
                    } else {
                        // user already exist do nothing only fetch it
                        return dispatch('fetchUserProfile', firebaseUser.user.uid)
                    }
                })
                .catch(error => {
                    dispatch('logout')
                    throwSignInError(error)
                })
        },
        // sign in and bind a social provider with email. Use case: when already exist a user with email
        // but it try to login using a social provider.
        signInBindSocialToEmail({ dispatch }, {email, password, socialCrendential}) {
            return firebaseAuthService.linkEmailToSocialCredential(email, password, socialCrendential)
                .then(firebaseUser => dispatch('fetchUserProfile', firebaseUser.user.uid))
                .catch(error => {
                    dispatch('logout')
                    throwSignInError(error)
                })
        },
        silentSignIn({ dispatch }) {
            return firebaseAuthService.silentSignIn()
                .then(firebaseUser => dispatch('fetchUserProfile', firebaseUser.uid))
                .catch(error => {
                    dispatch('logout')
                    throwSignInError(error)
                })
        },
        // sign up starting from user object and password
        signUp({ commit, dispatch }, {user, password}) {
            return firebaseAuthService.signUpFromEmailPassword(user.email, password)
                .then(firebaseUser => {
                    // if the sign up do a link operation, fetch directly the user from scanbage backend
                    // otherwise create a new one.
                    user.firebase_uid = firebaseUser.user.uid
                    if(firebaseUser.operationType == "link") {
                        return dispatch('updateUserData', user)
                    } else {
                        return createUserProfile(commit, user)
                    }
                })
                .catch(error => {
                    // !!! here firebase have already created a new user on its backend, but our backend no.
                    // if there is any error, the firebase user is deleted.
                    if(error.code && error.code != 201) { // handle conflit or any other error on scanbage backend
                        firebaseAuthService.deleteCurrentUser().then(() => dispatch('logout'))
                    }
                    dispatch('logout')
                    throwSignUpError(error)
                })
        },
        logout({ commit }) {
            commit('setUserProfile', null)
            return firebaseAuthService.logout()
        },
        // retrieve a user profile from scanbage backend
        fetchUserProfile({ commit }, firebaseUserUid) {
            return usersApi.getUser(firebaseUserUid).then(user => {
                commit('setUserProfile', user)
                return user
            })
        },
        updateUserData({commit}, user) {
            return usersApi.updateUser(user).then(updatedUser => {
                commit('setUserProfile', updatedUser)
                return updatedUser
            })
             // TODO: move to right module
        }
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        updateScore(state, score) {
            state.userProfile.score += score
        }
    }
}

// register a new user to scanbage backend
function createUserProfile(commit, user) {
    return usersApi.createUser(user).then(userCreated => {
        commit('setUserProfile', userCreated)
        return userCreated
    })
}

function throwSignInError(error) {
    throwAuthError(error, signInError)
}

function throwSignUpError(error) {
    throwAuthError(error, signUpError)
}

// handle and forward a firebase error or REST error, providing a description.
// useful for provide a unique error representation to caller.
function throwAuthError(error, errorDescriptionFunction) {
    throw {
        code: error.status || error.code,
        data: error.data || undefined,
        description: errorDescriptionFunction(error.status || error.code)
    }
}

// extract the user information starting from firebase user
// used for create a new user on scanbage backend when the sign up is provided by social provider
function extractUserFromSocial(firebaseUser) {
    let userLogged = firebaseUser.user
    let displayNamePieces = userLogged.displayName.split(" ")
    let name = displayNamePieces.length > 0 ? displayNamePieces[0] : undefined
    let surname = displayNamePieces.length > 1 ? displayNamePieces[1] : undefined
    return new User(undefined, userLogged.uid, name, surname, userLogged.email)
}