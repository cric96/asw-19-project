<template>
  <v-container fluid class="container_background" fill-height>
    <v-layout  align-center justify-center >
      <!--TODO. use src set for dimension-->
      <v-flex xs12 sm8 md4 >
        <v-img :src="require('../assets/logo.png')" class="mx-auto" height="300" width="300" style="background-color:rgba(255,255,255,0.8);border-radius: 50%"></v-img>
        <v-row class="ma-4" justify="center" align="center">
          <v-btn color="teal" class="ma-2" dark :key="signup" :to="'/sign-up'">
            <v-icon left>face</v-icon>Register
          </v-btn>
          <v-btn  color="teal" class="ma-2" dark :key="login" :to="'/login'">
            <v-icon left>no_encryption</v-icon>Sign in
          </v-btn>
        </v-row>
        <social-login></social-login>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import SocialLogin from "@/components/authentication/SocialLogin";

export default {
  components: {
    "social-login": SocialLogin
  }
};
</script>

<style>
  .centered_img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
</style>


