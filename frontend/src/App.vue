<template>
  <v-app>
    <complete-user-info v-model="needCompleteProfile"></complete-user-info>
    <router-view />
  </v-app>
</template>

<script>
import CompleteUserInfoForm from '@/components/authentication/CompleteUserInfoForm'

export default {
  name: 'App',
  components: {
    'complete-user-info': CompleteUserInfoForm
  },
  computed: {
    currentUser: function() {
      return this.$store.getters.currentUser();
    },
    isCompleteProfile: function() {
      return currentUser.isCompleteProfile;
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
