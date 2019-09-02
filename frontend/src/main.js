import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store  from './store/store.js'
import vuetify from './plugins/vuetify';
import fb from './firebaseConfig'


Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
