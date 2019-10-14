import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store  from './store/store.js'
import vuetify from './plugins/vuetify';
import './firebaseConfig'
import filters from './filters'
import './utils'
import ImageUploader from 'vue-image-upload-resize'

Vue.config.productionTip = false;

Vue.use(filters)
Vue.use(ImageUploader);
new Vue({
  router,
  vuetify,
  store,
  beforeCreate() {
    // .catch(() => {}) prevent uncaught promise
    store.dispatch('auth/silentSignIn').catch(() => {})
  },
  render: h => h(App)
}).$mount('#app');
