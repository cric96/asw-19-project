<template>
  <v-container>
    <v-layout align-center justify-center>
      <!--TODO. use src set for dimension-->
      <v-flex xs12>
        <v-img :src="require('../assets/logo.png')" class="my-3" contain height="200"></v-img>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center>
      <v-flex>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                label="E-mail"
                prepend-icon="person"
                :outlined="true"
                :rules="emailRules"
                :solo="true"
                :clearable="true"
                required
              ></v-text-field>

              <v-text-field
                :outlined="true"
                :solo="true"
                :clearable="true"
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

            <v-btn :disabled="!valid" color="success" @click="validate">Login</v-btn>
            <v-btn color="error" @click="reset">Reset Form</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    passwordShow: false,
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is Required"]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.login();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          if (user) {
            this.$store.commit("setCurrentUser", user.user);
            this.$router.replace("/home");
          }
        })
        .catch(err => {
          if (err.code == "auth/account-exists-with-different-credential") {
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().currentUser.linkWithPopup(provider);
          }
        });
    }
  }
};
</script>
