<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
          :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
          :type="passwordShow ? 'text' : 'password'"
          @click:append="passwordShow = !passwordShow"
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          label="confirm Password"
          :rules="passwordRules"
          required
          :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
          :type="confirmPasswordShow ? 'text' : 'password'"
          @click:append="confirmPasswordShow = !confirmPasswordShow"
        ></v-text-field>

        <v-text-field v-model="name" label="Name" required></v-text-field>

        <v-text-field v-model="surname" label="Surname" required></v-text-field>

        <v-text-field v-model="nickname" label="Nickname" required></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn :disabled="!valid" color="success" @click="validate">Register </v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";
import usersapi from "../../services/users.api";
import User from "../../model/user";
export default {
  data: () => ({
    passwordShow: false,
    confirmPasswordShow: false,
    valid: true,
    email: "",
    name: "",
    surname: "",
    nickname: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    confirmPassword: "",
    passwordRules: [v => !!v || "Password and Confirm password Required"]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.signUp();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          if (user) {
            let newuser = new User(
              user.user.uid,
              this.name,
              this.surname,
              this.email,
              null,
              null,
              this.nickname
            );
            usersapi.create_user(newuser);
            this.$router.replace("/login");
          }
        })
        .catch(err => {
          if (err.code == "auth/email-already-in-use") {
            const existingEmail = this.email;
            const password = this.password;
            firebase
              .auth()
              .fetchSignInMethodsForEmail(existingEmail)
              .then(function(providers) {
                const fbProvider = new firebase.auth.FacebookAuthProvider();
                if (
                  providers.indexOf(
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID
                  ) != -1
                ) {
                  // Sign in user to fb with same account.
                  fbProvider.setCustomParameters({ login_hint: existingEmail });
                  return firebase
                    .auth()
                    .signInWithPopup(fbProvider)
                    .then(function(result) {
                      return result.user;
                    });
                }
              })
              .then(function(user) {
                if (user) {
                  if (
                    firebase
                      .auth()
                      .currentUser.linkWithCredential(
                        firebase.auth.EmailAuthProvider.credential(
                          existingEmail,
                          password
                        )
                      )
                  ) {
                    this.$router.replace("/login");
                  }
                }
              });
          } else {
            console.log(err);
            alert(err);
          }
        });
    }
  }
};
</script>