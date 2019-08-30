<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-alert 
        dismissable      
        v-model="showSuccessAlert"
        type="success">
        Binding completed with success
      </v-alert>
      <v-alert  
        v-model="showErrorAlert"
        dismissable
        type="error">
        An error occurred; the insered password is not correct; try again with another password
      </v-alert>
      <v-card-title>
        <span class="headline">An account already exists with the same email provided by facebook.
           Please provide the password for: {{existingEmail}}</span>
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
        <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="bind">Bind</v-btn>
      </v-card-actions>
    </v-card>
    
  </v-dialog>
</template>

<script>
    import firebase from "firebase";

export default {
  data: () => ({
    password: null,
    error: null
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
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    bind: function() {
      firebase
      .auth()
      .signInWithEmailAndPassword(this.existingEmail, this.password)
      .then((user) => {
        // Existing email/password or Google user signed in.
        // Link Facebook OAuth credential to existing account.
        if (user) {
          //TODO show dialog
          firebase.auth().currentUser.linkWithCredential(this.pendingCred);
          this.error = false
          this.show = false
        }else {
          this.error = true
        }
      });
    }
  }
};
</script>

