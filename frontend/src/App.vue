<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
console.log(process.env.VUE_APP_NODE_SERVER)
export default {
  name: 'App'
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
