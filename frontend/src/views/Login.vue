<template>
  <v-container>
    <v-layout align-center justify-center>
    <!--TODO. use src set for dimension-->
    <v-flex xs12>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

    </v-layout>
    <v-layout row wrap align-center justify-center   width: 50%>
      <v-flex>
        <v-form
          align-center
          justify-center
          ref="form"
          v-model="valid"
          lazy-validation
        >
        
          <v-text-field
              v-model="email"
              label="E-mail"
              :outlined=true
              :solo=true
              :clearable=true
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

          <v-btn
            :disabled="!valid"
            color="success"
            @click="validate"
          >
            Login
          </v-btn>
          <v-btn color="error" @click="reset"> Reset Form </v-btn>
        </v-form>
        <button class="loginBtn loginBtn--facebook" @click="loginWithFb">
            Login with Facebook
        </button><br>

        <button class="loginBtn loginBtn--google" @click="loginWithGoogle">
            Login with Google
        </button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import firebase from 'firebase';

export default {
  data: () => ({
    passwordShow: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is Required'
    ]
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.login()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
            if(user){
                this.$store.commit('setCurrentUser', user.user)
                this.$router.replace('/home')
            }
        }).catch((err) => {
            if (err.code == 'auth/account-exists-with-different-credential') {
              var provider = new firebase.auth.FacebookAuthProvider();
              firebase.auth().currentUser.linkWithPopup(provider);
            }

        });
    },
    loginWithFb () {
        var provider = new firebase.auth.FacebookAuthProvider();
        this.providerLogin(provider)
    },
    loginWithGoogle () {
        var provider = new firebase.auth.GoogleAuthProvider();
        this.providerLogin(provider)
    },
    providerLogin(provider) {
        firebase.auth().signInWithPopup(provider).then((result) => {
          var token = result.credential.accessToken;
          var user = result.user;
          console.log(token)
          console.log(user)
          this.$store.commit('setCurrentUser', user)
          this.$router.replace('/home')
        }).catch(function(error) {
            if (error.code == 'auth/account-exists-with-different-credential') {
              const existingEmail = error.email;
              const pendingCred = error.credential;
              // Lookup existing account’s provider ID.
              firebase.auth().fetchSignInMethodsForEmail(error.email)
                .then(function(providers) {
                  if (providers.indexOf(firebase.auth.EmailAuthProvider.PROVIDER_ID) != -1) {
                    // Password account already exists with the same email.
                    // Ask user to provide password associated with that account.
                    var password = window.prompt('Please provide the password for ' + existingEmail);
                    return firebase.auth().signInWithEmailAndPassword(existingEmail, password);    
                  } /*else if (providers.indexOf(firebase.auth.GoogleAuthProvider.PROVIDER_ID) != -1) {
                    var googProvider = new firebase.auth.GoogleAuthProvider();
                    // Sign in user to Google with same account.
                    provider.setCustomParameters({'login_hint': existingEmail});
                    return firebase.auth().signInWithPopup(googProvider).then(function(result) {
                      return result.user;
                    });
                  } */
                })
                .then(function(user) {
                  // Existing email/password or Google user signed in.
                  // Link Facebook OAuth credential to existing account.
                  if(user){
                    firebase.auth().currentUser.linkWithCredential(pendingCred);
                  }
                });
            }
        });
    }
  }
}
</script>

<style scoped>
body { padding: 2em; }
/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}

/* Facebook */
.loginBtn--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}


/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
</style>