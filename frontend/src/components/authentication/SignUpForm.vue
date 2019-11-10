<template>
  <v-container fluid fill-height>
    <v-card v-bind:style="{ backgroundColor: color}" class="mx-auto" max-width=500>
      <alert v-model="showAlert" ref="alert"/>
      <v-card-title id="top-card" class="justify-center"> REGISTRATI </v-card-title>
      <v-card-text >
        <user-form 
            @validateForm="doSignUp"
            :v-model="true" 
            v-bind:userProperties="userProperties" 
            v-bind:user="user"
            :resettable="true"
            :loading="inRegistration"
            maxwidth="150px"
            actionName="Crea utente">
        </user-form>
      </v-card-text>
      <v-card-text class="text-center" id="bottom">
        <p> Hai già un account? <router-link to="/login">Log in</router-link></p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from "firebase"
import usersapi from "@/services/usersApi"
import authService from '@/services/firebaseAuthService'
import AlertMessageComponent from '@/components/AlertMessageComponent'
import UserForm from '@/components/user/UserForm'
import User from "@/model/user"
import * as messages from '@/resource/messages'
import { userPropsFilteredBuilder } from '../user/userProperties'

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
      return userPropsFilteredBuilder(this.user, 'email','password','name','surname','nickname')
    }
  },
  methods: {
    returnOnTop : function() {
      this.$vuetify.goTo("#top-card", {
          easing : 'easeInOutCubic',
          duration : 500,
          offset : 100
      })
    },
    reset: function() {
      this.$refs.form.reset()
    },
    ...mapActions('user', [
      'signUp'
    ]),
    doSignUp: function(newUser) {
      this.inRegistration = true
      this.signUp({ user : newUser, password : newUser.password}).then(user => {
        this.$refs.alert.showSuccess(messages.SIGNUP_SUCCESS)
        
        setTimeout(() => { 
          this.$router.replace("/dashboard"); 
        }, 1500)
      })
      .catch(error => {
        if(error.description !== undefined) {
          this.$refs.alert.showError(error.description)
        } else {
          this.$refs.alert.showError("Errore.. prova a modificare il form..")  
        }
      })
      .finally(() => {
        this.showAlert = true
        this.inRegistration = false
        this.returnOnTop()
      })
    }
  }
}
</script>