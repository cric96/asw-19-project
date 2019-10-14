<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
        <signup-form/>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import usersapi from "@/services/usersApi";
import User from "@/model/user";
import SignUpForm from "@/components/authentication/SignUpForm";

export default {
  components: {
    "signup-form": SignUpForm
  }
};
</script>


