import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store  from './store/store.js'
import auth from './auth.service'
import fb from './firebaseConfig.js'
import vuetify from './plugins/vuetify';
import authService from './auth.service'


Vue.config.productionTip = false;

authService.init();

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
