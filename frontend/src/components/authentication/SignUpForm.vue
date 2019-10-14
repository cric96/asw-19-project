<template>
  <v-container>
    <v-card v-bind:style="{ backgroundColor: color}">
      <alert v-model="showAlert" ref="alert"/>
      <v-card-title class="justify-center"> REGISTRATI </v-card-title>
      <v-card-text >
        <user-form :v-model="true" v-bind:userProperties="userProperties" v-bind:user="user" @validateForm="signUp" :resettable="true">
          Crea utente
        </user-form>
      </v-card-text>
      <v-card-text>
        <p> Hai già un account? <router-link to="/login">Log in</router-link></p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
import usersapi from "@/services/usersApi";
import User from "@/model/user";
import * as messages from '@/resource/messages';
import AlertMessageComponent from '@/components/AlertMessageComponent';
import UserForm from '@/components/user/UserForm';
import {userPropsFilteredBuilder} from '../user/userProperties';

export default {
  components: {
    "alert": AlertMessageComponent, 
    "user-form": UserForm
  },
  data: () => ({
    user: User.emptyUser(),
    showAlert: false,
    inRegistration: false,
    color:'rgba(255,255,255,0.9)'
  }),
  computed: {
    userProperties: function () {
      return userPropsFilteredBuilder(this.user, 'email','password','passwordConfirm','name','surname','nickname')
    }
  },
  methods: {
    reset: function() {
      this.$refs.form.reset()
    },
    createNewUser(firebase_uid, user) {
      return new User(
              undefined,
              firebase_uid,
              user.name,
              user.surname,
              user.email,
              user.nickname
            );
    },
    signUp(user) {
      this.inRegistration = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(response => {
          if (response) {
              let newuser = this.createNewUser(response.user.uid, user)
              this.$store.dispatch('signUp', newuser)
              .then((user)=>{
                this.showAlert = true
                this.$refs.alert.changeConfig(messages.SIGNUP_SUCCESS, "success")
                setTimeout(() => { this.$router.replace("/dashboard"); }, 1500)
              }).catch((err)=>{
                // TODO -- check server response (409...)
                this.inRegistration = false
                this.showAlert = true
                this.$refs.alert.changeConfig(messages.SIGNUP_ERR_NICKNAME_CONFLICT, "error")
                firebase.auth().currentUser.delete().then(function () {
                  console.log('delete successful in firebase because a specified nickname already exist')
                }).catch(function (error) {
                  console.error('error in firebase account deleting'+ error)
                })                
              })
          }
        })
        .catch(err => {
          if (err.code == "auth/email-already-in-use") {
            const existingEmail = user.email;
            const password = user.password;
            firebase.auth().fetchSignInMethodsForEmail(existingEmail).then((providers) =>{
                const fbProvider = new firebase.auth.FacebookAuthProvider()
                if (providers.indexOf(firebase.auth.FacebookAuthProvider.PROVIDER_ID) != -1) {
                  // Sign in user to fb with same account.
                  fbProvider.setCustomParameters({ login_hint: existingEmail })
                  return firebase
                    .auth()
                    .signInWithPopup(fbProvider)
                    .then(function(result) {
                      return result.user
                    })
                }else{
                  this.showAlert = true
                  this.$refs.alert.changeConfig(messages.SIGNUP_ERR_EMAIL_CONFLICT, "error")
                }
              })
              .then((user) =>{
                if (user) {
                  user.linkWithCredential(firebase.auth.EmailAuthProvider.credential(existingEmail,password)).then((userLinked)=>{
                    let newuser = this.createNewUser(userLinked.uid, user);
                    this.$store.dispatch('signInAndUpdate', newuser)
                    .then((user)=>{
                      this.$router.replace("/dashboard")
                    }).catch(err=>{
                      // TODO -- check server response (409...)
                      this.showAlert = true
                      this.$refs.alert.changeConfig(err, "error")
                    })
                  })
                }
              })
          } else {
            console.log(err)
          }
        })
    }
  }
}
</script>