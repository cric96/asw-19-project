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
      v-if="pendingBinding"
      v-model="pendingBinding"
      :existing-email="pendingBinding.email" 
      :pending-cred="pendingBinding.credential"
      @close="pendingBinding=null">
    </user-binding-dialog-form>
  </v-container>
</template>

 <script>
import firebase from "firebase";
import CompleteUserInfoForm from '@/components/authentication/CompleteUserInfoForm'
import BindUserForm from '@/components/authentication/BindUserForm'
import User from '@/model/user'
import firebaseAuthService from '@/services/firebaseAuthService'
import { mapActions } from 'vuex'

export default {
  components: { 
    "complete-user-dialog-form":CompleteUserInfoForm,
    "user-binding-dialog-form":BindUserForm 
 },
  data: () => ({
    showCompleteDialog: false,
    incompleteUser: null,
    pendingBinding: null
  }),
  methods: {
    ...mapActions('user', [
      'signInSocial'
    ]),
    loginWithFb() {
      let provider = new firebase.auth.FacebookAuthProvider()
      this.providerLogin(provider)
    },
    loginWithGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider()
      this.providerLogin(provider)
    },
    providerLogin(provider) {
      this.signInSocial(provider)
        .then(user => {
          this.$router.replace("/dashboard")
        })
        .catch(error => {
          if(error.code == "auth/account-exists-with-different-credential") {
            // show the binding dialog, that ask a password 
            // for email account and link it with current provider
            this.pendingBinding = {
              email: error.data.email,
              credential: error.data.credential
            }
            console.log(this.pendingBinding)
          }
        })
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
