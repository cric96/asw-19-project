<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
      <v-flex xs12 sm8 md4>
        <user-info-details :user="currentUser" class="mx-auto"></user-info-details>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import usersapi from "@/services/usersApi";
import User from "@/model/user";
import DetailsUserProfile from "@/components/user/DetailsUserProfile";
import { mapGetters } from 'vuex'

export default {
  components: {
    "user-info-details": DetailsUserProfile
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  mounted(){
    console.log(this.currentUser)
  }
};
</script>