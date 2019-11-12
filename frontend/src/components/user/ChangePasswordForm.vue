  
<template>
    <v-layout class="center">
        <confirm-change-password-dialog v-model="dialog" @confirmChange="changePassword(newPassword)"/>
       <v-card
        class="overflow-hidden width-max-600"
        outlined>
            <v-toolbar
                flat
                color="secondary"
                class="white--text"
            >
                <v-toolbar-title class="font-weight-light roboto-s">
                    <v-icon color="white" class="mr-2">fas fa-key</v-icon>
                    Cambia password
                </v-toolbar-title>        
            </v-toolbar>
            <v-card-text>
                <alert class="mt-3 mx-3" text v-model="showAlert" ref="alert"/>
        
                <span class="subtitle">Scegli una password efficace e non utilizzarla per altri account</span>
                <v-container fluid >
                    <v-form ref="form" v-model="valid">
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
                        
                </v-form>
                <v-row>
                            <v-col cols="12" sm="auto" md="auto">
                                <v-btn block color="primary" :disabled="!valid" @click="changePasswordPressed">Cambia password</v-btn>
                            </v-col>
                            <v-col cols="12" sm="auto" md="auto">
                                <v-btn block @click="onUserInfoView">Visualizza Informazioni</v-btn>
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<style scoped>
.width-max-600 {
  width:100%; 
  max-width:600px;
}
</style>

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
        onUserInfoView : function() {
            this.showAlert = false;
            this.$emit('userinfoview')
        },
        changePassword: function(password){
            if (this.$refs.form.validate()) {
firebaseAuthService.changePassword(this.oldPassword, this.newPassword)
                .then(() => {
                    this.showAlert = true
                    this.$refs.alert.changeConfig(messages.CHANGE_PASSWORD_SUCCESS, "success")
                })
                .catch(error => {
                    console.log(error)
                    this.showAlert = true
                    this.$refs.alert.changeConfig(messages.CHANGE_PASSWORD_ERROR, "error")
                })            }
            
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
    mounted() {
        this.showAlert = false
    }
}
</script>