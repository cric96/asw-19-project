import firebase from "firebase"

/* 1. create with email and password
 * 2. create a backend new user
 * 3. if email already in use, login with the provider
 * 4. link the email to the provider
 * 5. update the backend
 */ 
function signUpFromEmailPassword(email, password) {
    return firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(newUserCredential => newUserCredential.user)
        .catch(error => {
            if (error.code == "auth/email-already-in-use") {
                console.log('linking...')
                // fetch sign in methods error.email
                let credential = firebase.auth.EmailAuthProvider.credential(email, password)
                return signInLinkEmailToProvider(email, credential)
            } else {
                throw new FirebaseException(error.code)
            }

        })    
}

function signInFromEmailPassword(email, password) {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(retrieveUserToken)
        .catch(err => { throw new FirebaseException(err.code) })
}

function signInWithProvider(provider) {
    return firebase.auth()
        .signInWithPopup(provider)
        .catch(error => {
            if (error.code == "auth/account-exists-with-different-credential") {
                let email = error.email
                let credential = error.credential
                // Lookup existing account’s provider ID.
                
            }
            throw new FirebaseException(error.code)
        })
}

function logout() {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => resolve(), () => reject())
    })
}

function signInLinkEmailToProvider(existingEmail, newCredential) {
    console.log(existingEmail)
    return tryToSignInWithProvider(existingEmail)
        .then(firebaseLoggedUser => firebaseLoggedUser.linkWithCredential(newCredential))
        .then(linkedUserCredential => {
            console.log(linkedUserCredential.user)
            return success(linkedUserCredential.user)
            // let newuser = createUser(linkedUser.uid)
            // return signInBackend(newuser)
        })
}

/* return a promise that have success when a user is logged with another provider
 * and the promise's result contains it.
 * The promise fail if there is some error of login with another provider */
function tryToSignInWithProvider(email) {
    return firebase.auth().fetchSignInMethodsForEmail(email)
        .then(providers => getActiveProvider(providers))
        .then(provider => {
            // Sign in user using provider with same account.
            provider.setCustomParameters({login_hint: email})
            return firebase.auth().signInWithPopup(provider).then(result => result.user)
        })
}

function getActiveProvider(providers) {
    if(providers.indexOf(firebase.auth.FacebookAuthProvider.PROVIDER_ID) != -1) {
        return new firebase.auth.FacebookAuthProvider()
    } else {
        throw new FirebaseException("No valid active provider is found")
    }
}

function retrieveUserToken(firebaseUser=null,refresh=true) {
    let promiseUser = !firebaseUser ? retrieveFirebaseCurrentUser() : Promise.resolve(firebaseUser)
    return promiseUser.then(firebaseUser => firebaseUser.getIdToken(refresh).then(token => {
        return {
            user: firebaseUser,
            token: token
        }
    }))
}

function retrieveFirebaseCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsub = firebase.auth().onAuthStateChanged(firebaseUser => {
            unsub()
            resolve(firebaseUser)
        })
    })
}

function success(data = undefined) {
    return Promise.resolve(data)
}

function FirebaseException(code) {
    this.code = code
}

export default {
    signUpFromEmailPassword,
    logout,
    signInFromEmailPassword
}