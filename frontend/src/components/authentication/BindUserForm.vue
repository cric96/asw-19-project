<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <alert-message ref="alert" v-model="showAlert"></alert-message>
      <v-card-title>
        <span class="headline">There is an account (registered with username and password) having this email: {{existingEmail}}; please give the password to associate it with the facebook account you're trying to access with:</span>
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
        <v-btn color="blue darken-1" text @click="show=false" :disabled="pendingOperation">Close</v-btn>
        <v-btn color="blue darken-1" text @click="bind" :disabled="pendingOperation" :loading="pendingOperation">Associate</v-btn>
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
        this.$refs.alert.showSuccess("Association successfully completed")
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

