<template>
    <v-app light>
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
        path: '/dashboard/other',
        title: 'Other'
      }
    ]
  }),
  computed: {
    isAuth: function(){
      return this.$store.state.isAuthenticated;
    }
  },
  watch: {
    isAuth: function (val) {
      if(!val){
        this.$router.replace('/intro')
      }
    }
  },
  components: {
    'navigation-drawer': NavigationDrawer
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