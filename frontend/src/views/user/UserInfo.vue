<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
      <v-flex xs12 sm8 class="ma-4">
        <user-info :user="userProfile" class="mx-auto"></user-info>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import usersapi from "@/services/usersApi";
import User from "@/model/user";
import FlippedUserInfo from "@/components/user/FlippedUserInfo";
import { mapGetters } from 'vuex'

export default {
  components: {
    "user-info": FlippedUserInfo
  },
  computed: {
    ...mapGetters('user', [
      'userProfile'
    ])
  }
};
</script>