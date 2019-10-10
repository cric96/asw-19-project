<template>
  <v-app>
    <splash-screen v-if="isAppLoading"></splash-screen>
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
import SplashScreen from '@/components/SplashScreen'

export default {
  name: 'App',
  components: {
    'splash-screen': SplashScreen
  },
  computed: {
    isAppLoading: function() {
      return this.$store.getters['auth/isUserLoading'] // && if needed add other conditions
    }
  }
}
</script>

<style>
  .container_background {
    background: rgba(255,255,255,0.2) url('./assets/background.jpeg'); 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
</style>
