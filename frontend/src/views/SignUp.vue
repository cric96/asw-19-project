<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

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

          <v-text-field
            v-model="name"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="surname"
            label="Surname"
            required
          ></v-text-field>

          <v-text-field
            v-model="nickname"
            label="Nickname"
            required
          ></v-text-field>

          <v-btn
          :disabled="!valid"
          color="success"
          @click="validate"
          >
          Sign Up!
          </v-btn>

          <v-btn
          color="error"
          @click="reset"
          >
            Reset Form
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase';

export default {
  data: () => ({
    passwordShow: false,
    confirmPasswordShow: false,
    valid: true,
    email: '',
    name: '',
    surname: '',
    nickname:'',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    confirmPassword: '',
    passwordRules: [
      v => !!v || 'Password and Confirm password Required'
    ]
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.signUp()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    signUp : function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          if(user){
            this.$router.replace('/login')
          }
        }).catch((err) => {
            if (err.code == 'auth/email-already-in-use') {
              const existingEmail = this.email;
              const password = this.password;
              firebase.auth().fetchSignInMethodsForEmail(existingEmail)
                .then(function(providers) {
                  const fbProvider = new firebase.auth.FacebookAuthProvider();
                  if (providers.indexOf(firebase.auth.FacebookAuthProvider.PROVIDER_ID) != -1) {
                    // Sign in user to fb with same account.
                    fbProvider.setCustomParameters({'login_hint': existingEmail});
                    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
                      return result.user;
                    });
                  } 
                })
                .then(function(user) {    
                  if(user){
                    if(firebase.auth().currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(existingEmail, password))){
                      this.$router.replace('/login')
                    }
                  }
                });
            }    
        });
    }
   
  }
}
</script>


