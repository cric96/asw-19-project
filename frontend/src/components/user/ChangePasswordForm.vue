  
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
                        prependIcon="lock"
                        :passwordModel="oldPassword"
                        labelDescription="Vecchia password"
                        :passwordRules="passwordRuleComp"
                        :toCheck="undefined"
                    ></password-text-field>
                    <password-text-field
                        prependIcon="lock"
                        :passwordModel="newPassword"
                        labelDescription="Nuova password"
                        :passwordRules="passwordRuleComp"
                        :toCheck="undefined"
                    ></password-text-field>
                    <password-text-field
                        prependIcon="check"
                        :passwordModel="newPasswordConfirmation"
                        :toCheck="newPassword"
                        labelDescription="Conferma della nuova password"
                        :passwordRules="passwordRuleComp"
                    ></password-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" :disabled="!valid" @click="changePasswordPressed">Cambia password</v-btn>
                <v-btn color="primary"  @click="$emit('userinfoview')">Visualizza informazioni</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
    </v-container>    
    </template>
</template>

<script>
    import ConfirmChangePasswordDialog from "@/components/user/ChangePasswordConfirmDialog";
    import PasswordTextField from "@/components/authentication/PasswordTextField"
    //import firebase from 'firebase'
    import { passwordRule } from "@/components/user/userProperties";
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
        computed:{
            passwordRuleComp: function(){
                console.log("passRuleComp",passwordRule)
                return passwordRule;
            }
        },
        components: {
            "confirm-change-password-dialog": ConfirmChangePasswordDialog,
            "alert": AlertMessageComponent,
            "password-text-field": PasswordTextField
        },
    }
</script>