import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBvaKgMQ1FEkRHP4NjcMCsd6iCHfz392fo",
      authDomain: "scanbage.firebaseapp.com",
      databaseURL: "https://scanbage.firebaseio.com",
      projectId: "scanbage",
      storageBucket: "",
      messagingSenderId: "691846540350",
      appId: "1:691846540350:web:6f4fafc83a4e028f"
  };
firebase.initializeApp(config)

const auth = firebase.auth()
const currentUser = auth.currentUser

export {
    auth,
    currentUser
}