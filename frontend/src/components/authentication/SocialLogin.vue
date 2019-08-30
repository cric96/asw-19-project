<template>
  <div>
    <v-row justify="center">
      <button class="loginBtn loginBtn--facebook" @click="loginWithFb">Login with Facebook</button>
    </v-row>
    <v-row justify="center">
      <button class="loginBtn loginBtn--google" @click="loginWithGoogle">Login with Google</button>
    </v-row>
    <complete-user-dialog-form
      :visible="showCompleteDialog"
      :user="this.incompleteUser"
    ></complete-user-dialog-form>
    <user-binding-dialog-form 
      :existing-email="this.existingEmail" 
      :pending-cred="this.pendingCred" 
      :visible="showBindingDialog">
    </user-binding-dialog-form>
  </div>
</template>

 <script>
    import firebase from "firebase";
    import CompleteUserInfoForm from '@/components/authentication/CompleteUserInfoForm'
    import BindUserForm from '@/components/authentication/BindUserForm'
    import User from '@/model/user'
export default {
  components: { 
    "complete-user-dialog-form":CompleteUserInfoForm,
    "user-binding-dialog-form":BindUserForm 
 },
  data: () => ({
    showCompleteDialog: false,
    showBindingDialog: false,
    incompleteUser: null,
    existingEmail: null,
    pendingCred : null
  }),
  methods: {
    loginWithFb() {
      var provider = new firebase.auth.FacebookAuthProvider();
      this.providerLogin(provider);
    },
    loginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      this.providerLogin(provider);
    },
    providerLogin(provider) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$store.commit("setCurrentUser", result.user);
          // show dialog form to add loss info (nickname)
          if (result.additionalUserInfo.isNewUser) {
            //sand and save data user in backend
            var userLogged = result.user;
            this.incompleteUser = new User(userLogged.uid, userLogged.displayName.split(" ")[0], userLogged.displayName.split(" ")[1], userLogged.email, 0,1,null)
            this.showCompleteDialog = true;
          }else{
            this.$router.replace("/dashboard");
          }
        })
        .catch((error) => {
          if (error.code == "auth/account-exists-with-different-credential") {
            this.existingEmail = error.email;
            this.pendingCred = error.credential;
            // Lookup existing account’s provider ID.
            firebase
              .auth()
              .fetchSignInMethodsForEmail(error.email)
              .then((providers) =>{
                if (providers.indexOf(firebase.auth.EmailAuthProvider.PROVIDER_ID) != -1) {
                  // Password account already exists with the same email.
                  // Ask user to provide password associated with that account.
                  this.showBindingDialog= true
                }
              })
          } 
      })
    }  
  }
}
</script>

<style scoped>
body {
  padding: 2em;
}
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
  color: #fff;
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
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}

/* Facebook */
.loginBtn--facebook {
  background-color: #4c69ba;
  background-image: linear-gradient(#4c69ba, #3b55a0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354c8c;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png")
    6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5b7bd5;
  background-image: linear-gradient(#5b7bd5, #4864b1);
}

/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #dd4b39;
}
.loginBtn--google:before {
  border-right: #bb3f30 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #e74b37;
}
</style>
