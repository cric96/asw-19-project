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
      return this.$store.getters['user/isUserLoading'] // && if needed add other conditions
    }
  }
}
</script>

<style>
  .container_background {
    background: rgba(255,255,255,0.2) url('./assets/back_material.png'); 
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }
</style>
