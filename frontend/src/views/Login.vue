<template>
  <v-container fluid class="container_background" fill-height>
    <v-layout row align-center justify-center>
      <!--TODO. use src set for dimension-->
      <v-flex xs12 sm8 md4>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3, centered_img"
          height="300"
          width="300"
          style="background-color:rgba(255,255,255,0.8);border-radius: 50%"
        ></v-img>
      </v-flex>
      <v-flex xs12 sm8 md4 wrap>
        <v-card v-bind:style="{ backgroundColor: color}" class="mx-auto ma-3 mp-5">
          <alert v-model="showAlert" ref="alert"/>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
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
          <v-card-text>
            <p class="pa-3">
              You don't have an account?
              <router-link to="/sign-up">Sign up</router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import AlertMessageComponent from '@/components/AlertMessageComponent';
import * as messages from '@/resource/messages';
export default {
  components: {
    "alert": AlertMessageComponent 
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
    login: function() {
      this.loggingIn = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(response => {
          this.$store.dispatch("signIn").then(user=>{
            this.showAlert = true;
            this.$refs.alert.changeConfig(messages.LOGIN_SUCCESS, "success");
            setTimeout(() => { this.$router.replace("/dashboard"); }, 1500);
          }).catch(()=>{
            this.loggingIn = false;
            this.showAlert = true;
            this.$refs.alert.changeConfig(messages.LOGIN_ERROR, "error");
          });
        }).catch(err => {
          if(err.code="auth/wrong-password"){
            this.loggingIn = false;
            this.showAlert = true;
            this.$refs.alert.changeConfig(messages.LOGIN_WRONG_PASSWORD, "error");
          }
        });
    }
  }
};
</script>
