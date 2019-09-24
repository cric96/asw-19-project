import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi' || 'fa',
  },
  theme: {
    themes: {
      light: {
        primary: '#4caf50',
        secondary: '#8bc34a',
        accent: '#00bcd4',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#2196f3',
        success: '#cddc39'
      }
    }
  }
});
