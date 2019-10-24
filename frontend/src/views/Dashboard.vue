<template>
    <!-- single page application structure -->
    <v-app light>
      <!-- compontent to show popup to show new level -->
      <new-level/>
      <!-- component used to show snackbar notifications -->
      <snackbar-notification/>

      <complete-user-info v-if="userProfile" :value="needCompletation" :user="userObject"/>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click="drawer = !drawer"/>
        <v-toolbar-title>Scanbage</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>

      <navigation-drawer v-model="drawer" :navItems="navItems"></navigation-drawer>

      <v-content>
        
          <v-container fluid fill-height>
            
            <!--<v-layout row wrap>
              <v-breadcrumbs divider="/" ></v-breadcrumbs>
            </v-layout>-->
            <!-- TODO: insert v-breadcrumbs?? -->
            <!-- Replaced with the childrend view -->
            <v-layout row wrap>
              <router-view/>
            </v-layout>
          </v-container>
          <footer-app/>
      </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/components/navigation/NavigationDrawer'
import CompleteUserInfoForm from '@/components/authentication/CompleteUserInfoForm'
import SnackbarNotification from '@/components/SnackbarNotification'
import NewLevel from '@/components/NewLevel'
import Footer from '@/components/Footer'
import { mapGetters } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('trashCategories');

import User from '@/model/user'

export default {
  name: 'Dashboard',
  data: () => ({
    drawer: null,
    navItems: [
      {
        path: '/dashboard',
        icon: 'dashboard',
        title: 'Dashboard'
      },
      {
        path: '/leaderboard',
        title: 'Classifica',
        icon: 'emoji_events'
      },
      {
        path: '/rewards',
        title: 'Premi',
        icon: 'star'
      }
      ,{
        path: '/buildings',
        title: 'Edifici',
        icon: 'settings'
      },
    ]
  }),
  computed: {
    ...mapGetters('user', [
      'userProfile'
    ]),
    needCompletation: function() {
      return (this.userObject !== undefined) ? !this.userObject.isCompleteProfile() : false;
    },
    userObject: function() {
      return User.fromJson(this.userProfile)
    }
  },
  components: {
    'navigation-drawer': NavigationDrawer,
    'complete-user-info': CompleteUserInfoForm,
    'snackbar-notification': SnackbarNotification,
    'footer-app' : Footer,
    'new-level' : NewLevel
  },
  methods: {
    ...mapActions([
      'fetchCategories',
    ])
  },
  beforeMount() {
    this.fetchCategories()
  }
};
</script>