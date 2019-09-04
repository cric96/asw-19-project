<template>
  <v-container fluid>
    <v-row>
      <v-col align="center" class="py-1">
        <v-btn class="loginBtn loginBtn--facebook" block @click="loginWithFb" dense>
          <v-icon left dense>fab fa-facebook-f pr-1</v-icon>Login with Facebook
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="py-1">
        <v-btn class="loginBtn loginBtn--google" block @click="loginWithGoogle">
          <v-icon left dense>fab fa-google pr-1</v-icon>Login with Google
        </v-btn>
      </v-col>
    </v-row>
    <complete-user-dialog-form v-if="incompleteUser" v-model="showCompleteDialog"
      :user="incompleteUser" @save="socialRegister"></complete-user-dialog-form>
    <user-binding-dialog-form 
      :existing-email="this.existingEmail" 
      :pending-cred="this.pendingCred" 
      v-model="showBindingDialog"
      @close="showBindingDialog=false">
    </user-binding-dialog-form>
  </v-container>
</template>

 <script>
  import firebase from "firebase";
  import CompleteUserInfoForm from '@/components/authentication/CompleteUserInfoForm'
  import BindUserForm from '@/components/authentication/BindUserForm'
  import User from '@/model/user'

  import usersApi from '../../services/users.api.js'

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
          if(result) {
            // show dialog form to add loss info (nickname)
            if (result.additionalUserInfo.isNewUser) {
              //sand and save data user in backend
              var userLogged = result.user;
              this.incompleteUser = new User(undefined, userLogged.uid, userLogged.displayName.split(" ")[0], userLogged.displayName.split(" ")[1], userLogged.email)
              this.$store.dispatch('signUp', this.incompleteUser).then((user)=>{
                  this.$router.replace("/dashboard");
                });
            }else{
                this.$store.dispatch('signIn').then((user)=>{
                  this.$router.replace("/dashboard");
                });
            } 
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
    },
    socialRegister(finalUser) {
      
    }  
  }
}
</script>

<style scoped>
/* Shared */
.loginBtn {
  /*text-align: left;*/
  color: #fff;
}

/* Facebook */
.loginBtn--facebook {
  background-color: #4c69ba !important;
  background-image: linear-gradient(#4c69ba, #3b55a0);
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5b7bd5 !important;
  background-image: linear-gradient(#5b7bd5, #4864b1);
}



/* Google */
.loginBtn--google {
  background-color: #dd4b39 !important;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background-color: #e74b37 !important;
}
</style>
