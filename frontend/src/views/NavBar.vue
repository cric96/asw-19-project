<template>
    <div>
    <!-- display the navigation bar -->
    <v-toolbar dark>
      <v-toolbar-title >Scanbage</v-toolbar-title>
      <!-- navigation bar links -->
      <v-spacer></v-spacer>
      <v-toolbar-items class='hidden-xs-only' v-if="!isAuthenticated">
        <v-btn text color="teal" dark v-for="item in items" :key="item.title" :to="item.link">
              <v-icon left>{{item.icon}}</v-icon> {{item.title}}
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <!-- sign out button -->
      <v-toolbar-items class='hidden-xs-only' v-else>
        <v-btn  text color="teal" dark @click='logoutFromFirebase'>
        Logout
        <v-icon right dark>delete_sweep</v-icon>
      </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </div>
</template>

<script>
  import firebase from 'firebase';
  
export default {
  computed: {
    isAuthenticated() {
        return this.$store.getters.isAuthenticated;
    },
    items () {
      let menuItems = [
        {
          title: 'Registrati',
          icon: 'face',
          link: '/sign-up'
        },
        {
          title: 'Login',
          icon: 'no_encryption',
          link: '/login'
        }
      ]
      return menuItems
    }
  },
  methods: {
    logoutFromFirebase () {
        firebase.auth().signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.replace('/login')
      }, function(error) {
        console.log(error)
      });
    }
  }
}
</script>