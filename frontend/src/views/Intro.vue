<template>
  <v-container fluid>
    <v-layout align-center justify-center>
    <!--TODO. use src set for dimension-->
    <v-flex xs12 sm8 md4>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
        <v-btn text color="teal" dark  :key="signup" :to="'/sign-up'">
              <v-icon left>face</v-icon> Register
        </v-btn>
        <v-btn text color="teal" dark :key="login" :to="'/login'">
              <v-icon left>no_encryption</v-icon> Sign in
        </v-btn>
        <social-login></social-login>
      </v-flex>

    </v-layout>

  </v-container>
</template>
<script>
    import firebase from 'firebase';
  import SocialLogin from '@/components/authentication/SocialLogin';

export default {
  components: {
    'social-login': SocialLogin
  }
}
</script>

