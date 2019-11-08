  
<template>
    <v-container align-center justify-center>
        <confirm-change-password-dialog v-model="dialog" @confirmChange="changePassword(newPassword)"/>
       <v-card
        class="overflow-hidden"
        min-width="500"
        outlined>
            <alert v-model="showAlert" ref="alert"/>
            <v-toolbar
            flat
            color="secondary"
            class="white--text"
            >
                <v-toolbar-title class="font-weight-light">Cambia password</v-toolbar-title>        
            </v-toolbar>
            <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-subtitle> 
                    Scegli una password efficace e non utilizzarla per altri account
                </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <v-form ref="form" v-model="valid">
                <v-card-text>
                    <password-text-field
                        passwordLabel="Password corrente" 
                        v-model="oldPassword"
                        :outlined="true"
                        :required="true"
                        :clearable="true"
                    />
                    <password-text-field 
                        passwordLabel="Nuova password" 
                        passwordConfirmationLabel="Conferma della nuova password" 
                        v-model="newPassword"
                        :withConfirmation="true" 
                        :outlined="true"
                        :required="true"
                        :clearable="true"
                    />
                </v-card-text>
            <v-card-actions>
                <v-btn color="primary" :disabled="!valid" @click="changePasswordPressed">Cambia password</v-btn>
                <v-btn color="primary"  @click="$emit('userinfoview')">Visualizza informazioni</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
    </v-container>    
</template>

<script>
    import ConfirmChangePasswordDialog from "@/components/user/ChangePasswordConfirmDialog";
    import PasswordTextField from "@/components/authentication/PasswordTextField"
    import { passwordRule } from "@/components/user/userProperties";
    import AlertMessageComponent from '@/components/AlertMessageComponent';
    import * as messages from '@/resource/messages';
    import store  from '@/store/store.js'
    import fb from '@/firebaseConfig.js'
    import firebaseAuthService from '@/services/firebaseAuthService'
    export default {
        data:scope =>({
                dialog: false,
                showAlert: false,
                valid: true,
                password: "",
                newPassword: "",
                newPasswordConfirmation: ""
        }),  
    methods: {
        changePasswordPressed:  function(){
            this.dialog = true
        },
        changePassword: function(password){
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
    computed:{
        passwordRuleComp: function(){
            return passwordRule;
        }
    },
    components: {
        "confirm-change-password-dialog": ConfirmChangePasswordDialog,
        "alert": AlertMessageComponent,
        "password-text-field": PasswordTextField,
    },
    

}
</script>