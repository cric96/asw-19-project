<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-alert 
        dismissable      
        v-if="showSuccessAlert"
        type="success">{{successMessage}}
      </v-alert>
      <v-alert  
        v-if="showErrorAlert"
        dismissable
        type="error">
        {{errorMessage}}
      </v-alert>
      <v-card-title>
        <span class="headline">Esiste già un account (registrato con username e password) con la mail {{existingEmail}}; fornire la password per collegarlo all'account facebook con cui si vuole accedere:</span>
      </v-card-title>
      <v-card-text>
        <v-container>
              <v-text-field 
                clearable=true
                v-model="password"
                label="password" 
                type="password"
                required></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="show=false">Chiudi</v-btn>
        <v-btn color="blue darken-1" text @click="bind">Collega</v-btn>
      </v-card-actions>
    </v-card>
    
  </v-dialog>
</template>

<script>
import firebase from "firebase"
import { mapActions } from 'vuex'

export default {
  data: () => ({
    password: null,
    error: null,
    errorMessage: "",
    successMessage:""
  }),
  props: {
    pendingCred:String,
    existingEmail: String,
    value: Boolean
  },
  computed: {
    showSuccessAlert: function(){
      return !this.error && this.error!=null
    },
    showErrorAlert: function(){
      return this.error && this.error!=null
    },
    show: {
      get() {
        return this.value
      },
      set(value) {
        if(!value){
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    ...mapActions('auth', [
      'signInBindSocialToEmail'
    ]),

    // Existing email/password or Google user signed in.
    // Link Facebook OAuth credential to existing account.
    bind: function() {
      this.error = false
      this.signInBindSocialToEmail({
        email: this.existingEmail,
        password: this.password,
        socialCrendential: this.pendingCred
      }).then(user => {
        this.successMessage = "Collegamento completato con successo"
      }).catch(error => {
        this.error = true
        this.errorMessage = error
      })
    }
  }
};
</script>

