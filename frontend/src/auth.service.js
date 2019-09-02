import firebase from 'firebase'
import usersApi from '@/services/users.api.js'
import store from '@/store/store'

let currentUserPromise = null;

export default {
    init: function() {
        currentUserPromise = new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(firebaseUser => {
                console.log(firebaseUser);
                if(firebaseUser) {
                    // logged in
                    firebaseUser.getIdToken(true).then(token => {
                        store.commit('setToken', token);
                        if(token) {
                            usersApi.get_user().then(response => {
                                resolve({
                                    user: response.data,
                                    incomplete: false
                                })
                            }).catch(() => resolve({
                                user: null,
                                incomplete: true
                            }));
                        }
                    }).catch(() => reject());
                } else {
                    // not logged
                    reject();
                }
            });  
        });
    },
    authState(callback) {
        currentUserPromise.then(user => callback(user)).catch(() => callback(null))
    }
}