import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store  from './store/store.js'
import vuetify from './plugins/vuetify';
import fb from './firebaseConfig'
import filters from './filters'
import alertDialogPlugin from './plugins/alertDialog'

Vue.config.productionTip = false;

Vue.use(filters)
Vue.use(alertDialogPlugin)

new Vue({
  router,
  vuetify,
  store,
  beforeCreate() {
    // .catch(() => {}) prevent uncaught promise
    store.dispatch('autoSignIn').catch(() => {})
  },
  render: h => h(App)
}).$mount('#app');
