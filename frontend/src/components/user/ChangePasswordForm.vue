  
<template>
    <v-container>
        <confirm-change-password-dialog v-model="dialog" @confirmChange="changePassword(password)"/>
       <v-card
            class="mx-auto"
            max-width="500"
            outlined>
            <alert v-model="showAlert" ref="alert"/>
            <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">CAMBIA PASSWORD</div>
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
                var user = fb.auth.currentUser;
                var credentials = fb.authentication.EmailAuthProvider.credential(user.email, this.oldPassword);
                user.reauthenticateWithCredential(credentials).then(()=>{
                    user.updatePassword(this.newPassword).then(()=>{
                        this.showAlert = true
                        this.$refs.alert.changeConfig(messages.CHANGE_PASSWORD_SUCCESS, "success")
                    }).catch((error)=> {
                        this.showAlert = true
                        this.$refs.alert.changeConfig(messages.CHANGE_PASSWORD_ERROR, "error")
                    });
                });   
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