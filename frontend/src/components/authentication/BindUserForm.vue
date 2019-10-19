<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <alert-message ref="alert" v-model="showAlert"></alert-message>
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
        <v-btn color="blue darken-1" text @click="show=false" :disabled="pendingOperation">Chiudi</v-btn>
        <v-btn color="blue darken-1" text @click="bind" :disabled="pendingOperation" :loading="pendingOperation">Collega</v-btn>
      </v-card-actions>
    </v-card>
    
  </v-dialog>
</template>

<script>
import firebase from "firebase"
import { mapActions } from 'vuex'

import AlertMessage from '@/components/AlertMessageComponent'

export default {
  components: {
    'alert-message': AlertMessage
  },
  data: () => ({
    password: null,
    showAlert: false,
    pendingOperation: false
  }),
  props: {
    pendingCred: String,
    existingEmail: String,
    value: Boolean
  },
  computed: {
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
    ...mapActions('user', [
      'signInBindSocialToEmail'
    ]),

    // Existing email/password or Google user signed in.
    // Link Facebook OAuth credential to existing account.
    bind: function() {
      this.showAlert = false
      this.pendingOperation = true
      this.signInBindSocialToEmail({
        email: this.existingEmail,
        password: this.password,
        socialCrendential: this.pendingCred
      }).then(user => {
        this.$refs.alert.showSuccess("Collegamento completato con successo")
        this.$router.replace("/dashboard")
      }).catch(error => {
        this.$refs.alert.showError(error.description)
      }).finally(() => {
        this.showAlert = true
        this.pendingOperation = false
      })
    }
  }
};
</script>

