<template>
    <!-- display the navigation bar -->
    <v-toolbar >
      <v-toolbar-title >
        Scanbage
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- navigation bar links -->
      <v-toolbar-items class='hidden-xs-only' v-if="!userLoggedIn">
        <v-btn tile color="teal" dark v-for="item in items" :key="item.title" :to="item.link">
              <v-icon left>{{item.icon}}</v-icon> {{item.title}}
        </v-btn>
        
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <!-- sign out button -->
      <v-toolbar-items class='hidden-xs-only' v-else>
        <v-btn text @click='logoutFromFirebase'>
          <v-icon right>delete_sweep</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
  import firebase from 'firebase';

export default {
  computed: {
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
    },
    userLoggedIn () {
      var user = firebase.auth().currentUser;
      if (user != null) {
        user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
      //var token = User.getToken();
      return user;
    }
  },
  methods: {
    logoutFromFirebase () {
        firebase.auth().signOut().then(() => {
        // Sign-out successful.
        this.$router.replace('/login')
      }, function(error) {
        //An error happened.
      });
    }
  }
}
</script>