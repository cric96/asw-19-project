<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .container_background {
    background-image: url('./assets/background.jpeg'); 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }

  .container_background::before{
    background-color: rgba(255,255,255,0.2);
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
  }
</style>
