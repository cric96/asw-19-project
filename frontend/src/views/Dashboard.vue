<template>
    <v-app light>
      
      <snackbar-notification></snackbar-notification>

      <complete-user-info v-if="currentUser" :value="needCompletation"
        :user="currentUser"/>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click="drawer = !drawer"/>
        <v-toolbar-title>Scanbage</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>

      <navigation-drawer v-model="drawer" :navItems="navItems"></navigation-drawer>

      <v-content>
          <v-container fluid>
            
            <!-- TODO: insert v-breadcrumbs?? -->
            <!-- Replaced with the childrend view -->
            <router-view v-on:score-received="onScoreReceived"/>
          </v-container>
      </v-content>
      <v-snackbar
            v-model="newTrash"
            :timeout=2000
        >
        <p> Hai guardagnato {{score}} punti </p>
      </v-snackbar>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/components/navigation/NavigationDrawer'
import CompleteUserInfoForm from '@/components/authentication/CompleteUserInfoForm'
import SnackbarNotification from '@/components/SnackbarNotification'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data: () => ({
    drawer: null,
    newTrash: false,
    score: 0,
    navItems: [
      {
        path: '/dashboard',
        icon: 'dashboard',
        title: 'Dashboard'
      },
      {
        path: '/buildings',
        title: 'Manage Buldings',
        icon: 'settings'
      }
    ]
  }),
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    needCompletation: function() {
      return (this.currentUser !== undefined) ? !this.currentUser.isCompleteProfile() : false;
    }
  },
  components: {
    'navigation-drawer': NavigationDrawer,
    'complete-user-info': CompleteUserInfoForm,
    'snackbar-notification': SnackbarNotification
  },
  methods: {
    onScoreReceived(scoreReceived) {
      console.log("event reiceved")
      this.newTrash = true
      this.score = scoreReceived
    }
  }
};
</script>