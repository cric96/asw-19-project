<template>
  <v-container fluid class="container_background" fill-height>
    <v-layout row align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-img :src="require('../assets/logo.png')" class="my-3, centered_img" height="300" width="300" style="background-color:rgba(255,255,255,0.8);border-radius: 50%"></v-img>
      </v-flex>
      <v-flex xs12 sm8 md4>
        <signup-form class="mx-auto"></signup-form>
        <div class="ma-2">
            <p style="background-color:rgba(255,255,255,0.8)" class="pa-3">Have you already an account? <router-link to="/login">Log in</router-link></p>
        </div>
      </v-flex>
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


