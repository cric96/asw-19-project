<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          aspect-ratio="1.4" 
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Scanbage
        </h1>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <v-card
        class="mx-auto"
        max-width="400"
        width="300">
          <v-img
            class="white--text"
            height="200px"
            :src="getCurrentUser().photoURL"
          >
            <v-card-title class="align-end fill-height">{{getCurrentUser().uid}}</v-card-title>
          </v-img>

          <v-card-text>
            <span>{{getCurrentUser().email}}</span><br>
            <span class="text--primary">
              <span>{{getCurrentUser().displayName}}</span><br>
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import firebase from 'firebase';
  export default {
    data: () => ({
   
    }),
    methods:{
      getCurrentUser: function () {
        var user = firebase.auth().currentUser;
        if (user) {
          return user
        } else {
          console.log("No user is signed in.")
        }
      }
    }
}
</script>
