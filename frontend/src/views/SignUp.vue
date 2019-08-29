<template>
  <v-container>
    <v-layout row wrap align-center justify-center>
              <image-upload></image-upload>
      <v-avatar
        :tile=true
        :size="190"
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVgz4hgpib-3i_F5aursqYTGp9O7yCwXvJQRo6jRXtQd0N0Oynyw"
          alt="avatar"
        >
      </v-avatar>
    </v-layout>
          <signup-form></signup-form>
    <p>Have you already an account? Log in </p>
  </v-container>
</template>

<script>
import firebase from "firebase";
import usersapi from "../services/users.api";
import User from "../model/user";
import SignUpForm from '@/components/authentication/SignUpForm'

export default {
  components: {
    'signup-form': SignUpForm
  }
};
</script>


