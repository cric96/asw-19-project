<template>
  <v-container>
    <v-card v-bind:style="{ backgroundColor: color}">
      <alert v-model="showAlert" ref="alert"/>
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
            outlined
            :rules="emailRules"
            solo
            clearable
            required>
          </v-text-field>
          <v-text-field
            outlined
            solo
            clearable
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
            outlined
            solo
            clearable
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
            outlined
            solo
            clearable
            prepend-icon="perm_identity"
            label="Name" 
            :rules="generalRules" 
            required>
          </v-text-field>

          <v-text-field 
            v-model="surname" 
            label="Surname" 
            outlined
            solo
            clearable
            prepend-icon="perm_identity"
            :rules="generalRules" 
            required>
          </v-text-field>

          <v-text-field 
            v-model="nickname" 
            label="Nickname" 
            outlined
            solo
            clearable
            prepend-icon="perm_identity"
            :rules="generalRules" 
            required>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn :disabled="!valid" :loading="inRegistration" color="success" @click="validate">Register</v-btn>
        <v-btn color="error" @click="reset">Reset Form</v-btn>
      </v-card-actions>
      <v-card-text>
        <p>Have you already an account? <router-link to="/login">Log in</router-link></p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase"
import usersapi from "../../services/usersApi"
import User from "../../model/user"
import * as messages from '@/resource/messages'
import AlertMessageComponent from '@/components/AlertMessageComponent'
import authService from '@/services/firebaseAuthService'

import { mapActions } from 'vuex'

export default {
  components: {
    "alert": AlertMessageComponent 
  },
  data: () => ({
    showAlert: false,
    inRegistration: false,
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
        this.doSignUp()
      }
    },
    reset: function() {
      this.$refs.form.reset()
    },
    createNewUser() {
      return new User(
              undefined,
              undefined,
              this.name,
              this.surname,
              this.email,
              this.nickname
            )
    },
    ...mapActions('auth', [
      'signUp'
    ]),
    doSignUp: function() {
      this.inRegistration = true
      let newUser = this.createNewUser()
      this.signUp({ user : newUser, password : this.password}).then(user => {
        this.$refs.alert.changeConfig(messages.SIGNUP_SUCCESS, "success")
        setTimeout(() => { this.$router.replace("/dashboard"); }, 1500)
      })
      .catch(error => {
        this.$refs.alert.changeConfig((!error) ? messages.SIGNUP_ERR : error, "error")
      })
      .finally(() => {
        this.showAlert = true
        this.inRegistration = false
      })
    }
  }
}
</script>