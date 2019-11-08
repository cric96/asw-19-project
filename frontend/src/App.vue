<template>
  <v-app>
    <splash-screen v-if="isAppLoading"></splash-screen>
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
/**
 * root section, init the application if there is an used logged,
 * otherwhise show the loading splash screen..
 */
import SplashScreen from '@/components/SplashScreen'
export default {
  name: 'App',
  components: {
    'splash-screen': SplashScreen
  },
  computed: {
    //define when the application is not ready to show its content
    isAppLoading: function() {
      return this.$store.getters['user/isUserLoading'] // && if needed add other conditions
    }
  }
}
</script>

<style>
  @import './assets/styles/roboto.css';
  @import './assets/styles/crumpled.css';
  .container_background {
    background: rgba(255,255,255,0.2) url('./assets/back_material.png'); 
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }
  
  .full-vh {
    height: 100vh;
  }
  
  div[role="tablist"] {
      border-radius: 0px;
  }
  .v-list-item__avatar {
    justify-content: center !important;
  }
</style>
