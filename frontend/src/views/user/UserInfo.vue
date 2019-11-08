<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12" class="justify-center align-center mx-auto">
        <user-info :user="userProfile"></user-info>
      </v-col>
    </v-row>
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