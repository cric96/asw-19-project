<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
      <v-flex xs12 sm8 md4>
        <user-info-details :user="user" class="mx-auto"></user-info-details>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import usersapi from "@/services/users.api";
import User from "@/model/user";
import UserInfoDetails from "@/components/authentication/UserInfoDetails";

export default {
  props:{
    user: {
      type: User,
      required: true
    },
  },
  components: {
    "user-info-details": UserInfoDetails
  }
};
</script>