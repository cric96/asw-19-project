import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store/store.js'
import vuetify from './plugins/vuetify'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import filters from './filters'
import './utils'
import ImageUploader from 'vue-image-upload-resize'

export const SocketInstance = SocketIO(process.env.VUE_APP_WEBSOCKET)
Vue.config.productionTip = false

Vue.use(filters)
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance, //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}));

Vue.use(ImageUploader)
new Vue({
  router,
  vuetify,
  store,
  beforeCreate() {
    // .catch(() => {}) prevent uncaught promise
    store.dispatch('auth/silentSignIn').catch(() => {})
  },
  render: h => h(App)
}).$mount('#app')
