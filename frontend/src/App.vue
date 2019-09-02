<template>
  <v-app>
    <splash-screen v-if="loading"></splash-screen>
    <router-view v-else/>
  </v-app>
</template>

<script>
import SplashScreen from '@/components/SplashScreen'
import authService from './auth.service'

export default {
  name: 'App',
  beforeCreate() {
    authService.authState(user => {
      this.$store.commit('setUserProfile', user);
      this.loading = false;
    })
  },
  data: () => ({
    loading: true
  }),
  components: {
    'splash-screen': SplashScreen
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
