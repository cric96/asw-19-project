
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store/store.js'
import vuetify from './plugins/vuetify'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import VeeValidate from 'vee-validate';
import filters from './filters'
import './utils'
import firebaseConfig from "./firebaseConfig"
import ImageUploader from 'vue-image-upload-resize'
//initialize firebase instance
firebaseConfig.init()
Vue.config.productionTip = false
const SocketInstance = SocketIO(process.env.VUE_APP_WEBSOCKET)
Vue.use(filters)
Vue.use(VeeValidate)
//inject socket in vue instance
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance,
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}));
//image uploader is used to upload and resize images
Vue.use(ImageUploader)
new Vue({
  $_veeValidate: {
    validator: 'new'
  },
  router,
  vuetify,
  store,
  beforeCreate() {
    //try to sign into the web site.
    store.dispatch('user/silentSignIn').catch(() => {})
  },
  render: h => h(App)
}).$mount('#app') 
