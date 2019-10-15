<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
        <v-card v-bind:style="{ backgroundColor: color}" class="mx-auto ma-3 mp-5">
          <alert v-model="showAlert" ref="alert"></alert>
          <v-card-title class="justify-center"> ACCEDI </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @keyup.native.enter="validate">
              <v-text-field
                v-model="email"
                label="E-mail"
                prepend-icon="person"
                outlined
                :rules="emailRules"
                solo
                clearable
                required
              ></v-text-field>

              <v-text-field
                outlined
                solo
                clearable
                v-model="password"
                :rules="passwordRules"
                prepend-icon="lock"
                label="Password"
                required
                :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                :type="passwordShow ? 'text' : 'password'"
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" color="success" :loading="loggingIn" @click="validate">Login</v-btn>
            <v-btn color="error" @click="reset">Reset Form</v-btn>
          </v-card-actions>
          <social-login/>
          <v-card-text>
            <p class="pa-3">
              Hai già un account?
              <router-link to="/sign-up">Registrati</router-link>
            </p>
          </v-card-text>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import AlertMessageComponent from '@/components/AlertMessageComponent';
import * as messages from '@/resource/messages';
import SocialLogin from "@/components/authentication/SocialLogin";

import { mapActions } from 'vuex';

export default {
  components: {
    "alert": AlertMessageComponent,
    "social-login": SocialLogin
  },
  data: () => ({
    showAlert: false,
    color: "rgba(255,255,255,0.9)",
    passwordShow: false,
    valid: true,
    loggingIn: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is Required"]
  }),
  methods: {
    validate: function() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    reset: function() {
      this.$refs.form.reset();
    },
    ...mapActions('auth', [
      'signInEmailPassword'
    ]),
    login: function() {
      this.loggingIn = true;
      this.signInEmailPassword({email: this.email, password: this.password})
        .then(user => {
          this.$refs.alert.showSuccess(messages.LOGIN_SUCCESS);
          setTimeout(() => { this.$router.replace("/dashboard"); }, 1500);
        })
        .catch(error => {
          this.$refs.alert.showError(error.description);
        })
        .finally(() => {
          this.showAlert = true
          this.loggingIn = false
        })
    }
  }
};
</script>
