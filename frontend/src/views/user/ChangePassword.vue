<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
      <v-flex xs12 sm8 md4>
        <change-pass-form class="mx-auto"></change-pass-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import ChangePasswordForm from "@/components/user/ChangePasswordForm";

export default {
  components: {
    "change-pass-form": ChangePasswordForm
  }
};
</script>


