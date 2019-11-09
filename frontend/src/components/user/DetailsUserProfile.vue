<template>
  <v-layout class="center">
    <v-card
      class="overflow-hidden width-max-600" outlined>
      <v-toolbar
        flat
        color="secondary"
        class="white--text"
      >
        <v-icon color="white" class="mr-2">mdi-account</v-icon>
        <v-card-title class="font-weight-light roboto-s">Profilo utente</v-card-title>
        <div class="flex-grow-1"></div>
        <v-btn
          color="primary"
          fab
          small
          @click="onEditClick"
        >
          <v-icon  v-if="isEditing">mdi-close</v-icon>
          <v-icon  v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
        
      <v-card-text>
        <alert class="mt-3 mx-3" text v-model="showAlert" ref="alert"/>
          <user-form v-model="isEditing" 
          v-bind:userProperties="userProperties" 
          v-bind:user="user" 
          :beDisabled="true" 
          actionName="Aggiorna"
          :actionEnable="isEditing"
          @validateForm="updateUser">
            <v-col cols="12" sm="auto" md="auto">
              <v-btn  block @click="onShowPassword">
                  Cambia password
              </v-btn>
            </v-col>
          </user-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;

}

.width-max-600 {
  width:100%; 
  max-width:600px;
}

</style>

<script>
import Notification from "@/model/notification"
import UserForm from '@/components/user/UserForm'
import {userPropsFilteredBuilder} from './userProperties';
import * as messages from '@/resource/messages';
import AlertMessageComponent from '@/components/AlertMessageComponent';
export default {
    props:{
        user: {
            required: true
        }
    },
    components: {
        'user-form': UserForm,
        'alert' : AlertMessageComponent
    },
    data: () => ({
        isEditing: false,
        flipped: false,
        showAlert: false,
    }),
    methods:{
        updateUser(user){
          this.$store.dispatch("user/updateUserData", user)
          .then(response => {
              this.showAlert = true
              this.$refs.alert.showSuccess(messages.UPDATED_INFO)
          })
          .catch(err => {
            this.showAlert = true
            this.$refs.alert.showError(
               (err.status == 409) ? // this means bad request for existing nickname
                messages.SIGNUP_ERR_NICKNAME_CONFLICT : 
                messages.UPDATE_INFO_ERR 
            )
          })
        },
        onShowPassword() {
          this.showAlert = false

          this.$emit('changepasswordclicked',true)
        },
        onEditClick() {
          this.isEditing = !this.isEditing
          this.showAlert = false
        }
    },
    computed: {
      userProperties: function () {
        return userPropsFilteredBuilder(this.user, 'email','name','surname','nickname')
      }
    }
}
</script>