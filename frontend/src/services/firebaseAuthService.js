import firebase from "firebase"

const tokenProvider = {
    currentToken: null,
    refreshToken: function() {
        return retrieveFirebaseCurrentUser()
            .then(firebaseUser => firebaseUser.getIdToken(true))
            .then(token => {
                this.currentToken = token
            })
    }
}

/* Sign up a new user to firebase auth backend
 * starting from email and password, it handle some errors:
 *  - when the email is already in use, it try to link the email to another account's provider.
 *  - in other cases, throw a FirebaseException that contains the firebase's error code.
 * @return {Promise.<FirebaseUser>} it contains the firebase user already authenticated
 */
function signUpFromEmailPassword(email, password) {
    return firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
            if (error.code == "auth/email-already-in-use") {
                // link a social account to this new one.
                let credential = firebase.auth.EmailAuthProvider.credential(email, password)
                return checkAvailableProvider(email, firebase.auth.FacebookAuthProvider.PROVIDER_ID)
                    .then(provider => {
                        if(!provider) throw new FirebaseException(error.code)
                        provider.setCustomParameters({login_hint: email})
                        return signInWithProvider(provider)
                    })
                    .then(firebaseUser => firebaseUser.user.linkWithCredential(credential))
            } else {
                throw new FirebaseException(error.code)
            }
        })
        .then(firebaseUser => tokenProvider.refreshToken().then(() => firebaseUser))
}

/* Sign an existing user starting from email and password.
 * @return {Promise.<FirebaseUser>} 
 */
function signInFromEmailPassword(email, password) {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(firebaseUser => tokenProvider.refreshToken().then(() => firebaseUser))
        .catch(throwFirebaseError)
}

/* Logout the current logged firebase user
 * @return {Promise}
 */
function logout() {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => resolve(), () => reject())
    })
}

function deleteCurrentUser() {
    return retrieveFirebaseCurrentUser().then(firebaseUser => firebaseUser.delete())
}

function signInWithProvider(provider) {
    return firebase.auth()
        .signInWithPopup(provider)
        .then(firebaseUser => tokenProvider.refreshToken().then(() => firebaseUser))
        .catch(error => {
            if(error.code == "auth/account-exists-with-different-credential") {
                // Check if exist a Email provider for the user, if there is
                // it throw an exception providing all information for link
                return checkAvailableProvider(error.email, firebase.auth.EmailAuthProvider.PROVIDER_ID).then(() => {
                    throw new FirebaseException(error.code, {
                        email: error.email,
                        credential: error.credential
                    })
                })
            }
            throwFirebaseError(error)
        })
}

function silentSignIn() {
    return retrieveFirebaseCurrentUser().then(firebaseUser => {
        if(!firebaseUser) throw new FirebaseException("auth/failed-silent-signin")
        return tokenProvider.refreshToken().then(() => firebaseUser)
    })
}

function linkEmailToSocialCredential(email, password, socialCredential) {
    return signInFromEmailPassword(email, password)
        .then(firebaseUser => firebaseUser.linkWithCredential(socialCredential))
        .then(firebaseUser => tokenProvider.refreshToken().then(() => firebaseUser))
        .catch(throwFirebaseError)
}

function changePassword(oldPassword, newPassword) {
    return retrieveFirebaseCurrentUser().then(user => {
        let credentials = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
        return user.reauthenticateWithCredential(credentials).then(() => user.updatePassword(newPassword))
    }).then(() => tokenProvider.refreshToken()); 
}

function checkAvailableProvider(email, providerId) {
    return firebase.auth().fetchSignInMethodsForEmail(email)
        .then(providers => providers.find(provider => provider == providerId))
        .then(getProviderFromId)
        .catch(throwFirebaseError)
}

function getProviderFromId(providerId) {
    switch(providerId) {
        case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
            return new firebase.auth.FacebookAuthProvider()
        case firebase.auth.EmailAuthProvider.PROVIDER_ID:
            return new firebase.auth.EmailAuthProvider()
        default:
            return undefined 
    }
}

function retrieveFirebaseCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsub = firebase.auth().onAuthStateChanged(firebaseUser => {
            unsub()
            resolve(firebaseUser)
        })
    })
}

function throwFirebaseError(firebaseError) {
    throw new FirebaseException(firebaseError.code)
}

function FirebaseException(code, data=null) {
    this.code = code
    this.data = data
}

export {
    tokenProvider
}

export default {
    signInFromEmailPassword,
    signInWithProvider,
    silentSignIn,
    signUpFromEmailPassword,
    changePassword,
    logout,
    linkEmailToSocialCredential,
    deleteCurrentUser
}