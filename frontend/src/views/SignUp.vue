<template>
  <v-container fluid class="container_background" fill-height>
    <v-layout column wrap align-center justify-center>
      <signup-form></signup-form>
      <router-link to="login">Log in</router-link>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import usersapi from "../services/users.api";
import User from "../model/user";
import SignUpForm from "@/components/authentication/SignUpForm";

export default {
  components: {
    "signup-form": SignUpForm
  }
};
</script>


