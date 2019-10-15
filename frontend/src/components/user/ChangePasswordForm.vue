  
<template>
    <v-container>
        <confirm-change-password-dialog v-model="dialog" @confirmChange="changePassword(newPassword)"/>
       <v-card
            class="mx-auto"
            max-width="500"
            outlined>
            <alert v-model="showAlert" ref="alert"/>
            <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">CAMBIA PASSWORD</div>
                <v-list-item-subtitle><!-- TODO: scrivere qualcosa di diverso --> 
                    Se cambi la password verrai disconnesso e dovrai inserire la nuova password al login successivo. 
                </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <v-form ref="form" v-model="valid">
            <v-card-text>
                <v-text-field
                        v-model="oldPassword"
                        label="vecchia password"
                        :rules="passwordRules"
                        outlined
                        required
                        clearable
                        prepend-icon="lock"
                        :type="oldPasswordShow ? 'text' : 'password'"
                        :append-icon="oldPasswordShow ? 'visibility' : 'visibility_off'"
                        @click:append="oldPasswordShow = !oldPasswordShow"
                    ></v-text-field> 
                    <v-text-field
                        v-model="newPassword"
                        label="nuova password"
                        :rules="passwordRules"
                        outlined
                        required
                        clearable
                        prepend-icon="lock"
                        :type="newPasswordShow ? 'text' : 'password'"
                        :append-icon="newPasswordShow ? 'visibility' : 'visibility_off'"
                        @click:append="newPasswordShow = !newPasswordShow"
                    ></v-text-field> 
                    <v-text-field
                        required
                        v-model="newPasswordConfirmation"
                        label="conferma della nuova password"
                        :rules="passwordConfirmationRules"
                        outlined
                        clearable
                        prepend-icon="check_circle"
                        :type="newPasswordConfirmationShow ? 'text' : 'password'"
                        :append-icon="newPasswordConfirmationShow ? 'visibility' : 'visibility_off'"
                        @click:append="newPasswordConfirmationShow = !newPasswordConfirmationShow"
                    ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" :disabled="!valid" @click="changePasswordPressed">Cambia password</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
    </v-container>    
    </template>
</template>

<script>
    import ConfirmChangePasswordDialog from "@/components/user/ChangePasswordConfirmDialog";
    //import firebase from 'firebase'
    import AlertMessageComponent from '@/components/AlertMessageComponent';
    import * as messages from '@/resource/messages';
    import store  from '@/store/store.js'
    import fb from '@/firebaseConfig.js'
    import firebaseAuthService from '@/services/firebaseAuthService'

    export default {
        data() {
            return {
                dialog: false,
                showAlert: false,
                valid: true,
                oldPassword: "",
                newPassword: "",
                newPasswordConfirmation: "",
                passwordRules: [v => !!v || "il campo password è obbligatorio", v =>  v!==undefined && v.length >= 6 || "La password deve essere almeno di 6 caratteri"],
                passwordConfirmationRules: [ v => !!v || 'è obbligatorio inserire la conferma della password', v =>  this.newPassword === this.newPasswordConfirmation || "La password di conferma non coincide con quella sopra inserita"],
                newPasswordShow: false,
                newPasswordConfirmationShow: false,
                oldPasswordShow: false
            }
        },  
        methods: {
            changePasswordPressed:  function(){
                this.dialog = true
            },
            changePassword: function(password){
                console.log(password)
                firebaseAuthService.changePassword(this.oldPassword, this.newPassword)
                    .then(() => {
                        this.showAlert = true
                        this.$refs.alert.changeConfig(messages.CHANGE_PASSWORD_SUCCESS, "success")
                    })
                    .catch(error => {
                        console.log(error)
                        this.showAlert = true
                        this.$refs.alert.changeConfig(messages.CHANGE_PASSWORD_ERROR, "error")
                    })
            }
        },
        components: {
            "confirm-change-password-dialog": ConfirmChangePasswordDialog,
            "alert": AlertMessageComponent
        },
    }
</script>