/*import firebase from 'firebase'
import usersApi from '@/services/usersApi'

function fetchUserInfo() {
    return usersApi.get_user()
}

export default {
    namespaced: true,
    state: {
        token: null,
        currentUser: null
    },
    getters: {
        isAuth: state => state.currentUser !== null,
        token: state => state.token
    },
    actions: {
        autoSignIn() {
            return this.dispatch('auth/signIn');
        },
        signIn({ commit }) {
            return new Promise((resolve, reject) => {
                const unsub = firebase.auth().onAuthStateChanged(firebaseUser => {
                    if(firebaseUser) { 
                        firebaseUser.getIdToken(true).then(token => {
                            commit('setToken', token);
                            fetchUserInfo().then(fetchUser => {
                                commit('setCurrentUser', fetchUser)
                                resolve()
                            })
                        });
                    } else {
                        commit('setCurrentUser', null)
                        reject()
                    }
                    unsub();
                })
            })
        }
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
        },
        setCurrentUser(state, val) {
            state.currentUser = val;
        }
    }
}*/