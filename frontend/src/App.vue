<template>
  <v-app>
    <NavBar></NavBar>
    <router-view/>
  </v-app>
</template>

<script>
import NavBar from '@/views/NavBar'
export default {
  name: 'App',
  components: {
    'NavBar': NavBar
  }
}
</script>