import Vue from 'vue';
import App from './App.vue';
import router from './router';
import  store  from './store/store.js'
import fb from './firebaseConfig.js'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

let app = '';

fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
