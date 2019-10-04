  
<template>
    <v-container>
       <v-card
            class="mx-auto"
            max-width="400"
            outlined>
            <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">CAMBIA PASSWORD</div>
                <v-list-item-subtitle> 
                    Se cambi la password verrai disconnesso e dovrai inserire la nuova password al login successivo. 
                </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <v-form ref="form" v-model="valid">
            <v-card-text>
                    <v-text-field
                        v-model="password"
                        label="password"
                        :rules="passwordRules"
                        outlined
                        required
                        clearable
                        prepend-icon="lock"
                        :type="passwordShow ? 'text' : 'password'"
                        :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                        @click:append="passwordShow = !passwordShow"
                    ></v-text-field> 
                    <v-text-field
                        required
                        v-model="passwordConfirmation"
                        label="conferma della password"
                        :rules="passwordConfirmationRules"
                        outlined
                        clearable
                        prepend-icon="check_circle"
                        :type="passwordConfirmationShow ? 'text' : 'password'"
                        :append-icon="passwordConfirmationShow ? 'visibility' : 'visibility_off'"
                        @click:append="passwordConfirmationShow = !passwordConfirmationShow"
                    ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" :disabled="!valid" @click="validate" text>Cambia password</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
    </v-container>    
    </template>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            password: "",
            passwordConfirmation: "",
            passwordRules: [v => !!v || "il campo password è obbligatorio", v =>  v!==undefined && v.length >= 6 || "La password deve essere almeno di 6 caratteri"],
            passwordConfirmationRules: [ v => !!v || 'è obbligatorio inserire la conferma della password', v =>  v === this.password || "La password di conferma non coincide con quella sopra inserita"],
            passwordShow: false,
            passwordConfirmationShow: false
        }
    },  
    methods: {
        changePassword: function(password) {
            var user = firebase.auth().currentUser;
            user.updatePassword(password).then(function() {
            // Update successful.
            }).catch(function(error) {
            // An error happened.
            });
        }
    }
}
</script>