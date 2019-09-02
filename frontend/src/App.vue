<template>
  <v-app>
    <complete-user-info 
      v-model="needCompletation" 
      :user="currentUser"/>
    <router-view />
  </v-app>
</template>

<script>
import CompleteUserInfoForm from '@/components/authentication/CompleteUserInfoForm'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    'complete-user-info': CompleteUserInfoForm
  },
  data: () => ({
    needCompletation: false
  }),
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  watch: {
    currentUser: function(val) {
      this.needCompletation = !val.isCompleteProfile();
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
