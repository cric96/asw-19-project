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
    import firebase from "firebase";

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
        return this.value;
      },
      set(value) {
        if(!value){
          this.$emit('close');
        }
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
          this.successMessage = "La password inserita è corretta. I due account verranno immediatamente collegati"
          this.error = false
          //TODO show dialog
          firebase.auth().currentUser.linkWithCredential(this.pendingCred).then((userLinked)=>{
            this.$store.dispatch('signIn').then((user)=>{
              this.successMessage = "Collegamento completato con successo"
              this.$router.replace("/dashboard");
            }).catch(err=>{
              //todo chack erros
              console.log(err)
              this.error = true
              this.errorMessage = "Errore nel collegamento dei due account"
            })
          }).catch((err)=>{
            console.log(err)
          });
          
        }else {
          this.error = true
          this.errorMessage = "Attenzione, si è veirificato un errore nel login"
        }
      }).catch((err)=>{
        if(err.code='auth/wrong-password'){
            this.error = true
            this.errorMessage = "ERRORE; la password inserita non è corretta; riprova inserendo una nuova password"
        }
      });
    }
  }
};
</script>

