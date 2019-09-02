<template>
  <v-container>
    <v-card v-bind:style="{ backgroundColor: color}">
      <v-card-text >
        <v-form  ref="form" v-model="valid" lazy-validation>
          <v-flex xs12 sm8 md4 class="mb-4">
            <v-avatar size="96" class="mr-4">
              <img
                :src="'https://st2.depositphotos.com/8440746/11336/v/950/depositphotos_113366940-stock-illustration-user-icon-profile-man-businessman.jpg'"
                alt="Avatar"
              />
            </v-avatar>
            <v-btn @click="openAvatarPicker">Change Avatar</v-btn>
          </v-flex>
          <v-text-field 
            v-model="email"
            label="E-mail"
            prepend-icon="person"
            outlined=true
            :rules="emailRules"
            solo=true
            clearable=true
            required>
          </v-text-field>
          <v-text-field
            outlined=true
            solo=true
            clearable=true
            prepend-icon="lock"
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
            outlined=true
            solo=true
            clearable=true
            prepend-icon="lock"
            label="Confirm Password"
            :rules="passwordRules"
            required
            :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
            :type="confirmPasswordShow ? 'text' : 'password'"
            @click:append="confirmPasswordShow = !confirmPasswordShow"
          ></v-text-field>

          <v-text-field 
            v-model="name" 
            outlined=true
            solo=true
            clearable=true
            prepend-icon="perm_identity"
            label="Name" 
            :rules="generalRules" 
            required>
          </v-text-field>

          <v-text-field 
            v-model="surname" 
            label="Surname" 
            outlined=true
            solo=true
            clearable=true
            prepend-icon="perm_identity"
            :rules="generalRules" 
            required>
          </v-text-field>

          <v-text-field 
            v-model="nickname" 
            label="Nickname" 
            outlined=true
            solo=true
            clearable=true
            prepend-icon="perm_identity"
            :rules="generalRules" 
            required>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!valid" color="success" @click="validate">Register</v-btn>
        <v-btn color="error" @click="reset">Reset Form</v-btn>
      </v-card-actions>
      <v-card-text>
        <p>Have you already an account? <router-link to="/login">Log in</router-link></p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
import usersapi from "../../services/users.api";
import User from "../../model/user";

export default {
  data: () => ({
    color:'rgba(255,255,255,0.9)',
    passwordShow: false,
    confirmPasswordShow: false,
    valid: true,
    email: "",
    name: "",
    surname: "",
    nickname: "",
    emailRules: [
      v => !!v || "il campo E-mail è obbligatorio",
      v => /.+@.+/.test(v) || "L'e-mail deve essere valida"
    ],
    generalRules: [v => !!v || "Questo campo è obbligatorio"],
    password: "",
    confirmPassword: "",
    passwordRules: [v => !!v || "La Password e la sua conferma sono obbligatorie"],
  }),
  methods: {
    validate: function() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.signUp();
      }
    },
    reset: function() {
      this.$refs.form.reset();
    },
    createNewUser(firebase_uid) {
      return new User(
              undefined,
              firebase_uid,
              this.name,
              this.surname,
              this.email,
              this.nickname
            );
    },
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(response => {
          if (response) {
            let newuser = this.createNewUser(response.user.uid);
            this.$store.dispatch('signUp', newuser).then((user)=>{
              this.$router.replace("/dashboard");
            }).catch(()=>{
              //TODO check error
            })
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
              .then((user) =>{
                if (user) {
                  user.linkWithCredential(firebase.auth.EmailAuthProvider.credential(existingEmail,password)).then((userLinked)=>{
                    let newuser = this.createNewUser(userLinked.uid);
                    this.$store.dispatch('signInAndUpdate', newuser).then((user)=>{
                      this.$router.replace("/dashboard");
                    }).catch(err=>{
                      //todo chack erros
                      console.log(err)
                    })
                  })
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