import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

let app = '';
const config = {
  apiKey: "AIzaSyBvaKgMQ1FEkRHP4NjcMCsd6iCHfz392fo",
    authDomain: "scanbage.firebaseapp.com",
    databaseURL: "https://scanbage.firebaseio.com",
    projectId: "scanbage",
    storageBucket: "",
    messagingSenderId: "691846540350",
    appId: "1:691846540350:web:6f4fafc83a4e028f"
};
firebase.initializeApp(config);

const auth = firebase.auth()
const currentUser = auth.currentUser

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
});

export {
  auth,
  currentUser
}