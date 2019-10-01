<template>
  <v-card
    class="overflow-hidden"
    dark
  >
    <v-toolbar
      flat
      color="grey"
    >
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">Profilo utente</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn
        color="grey darken-3"
        fab
        small
        @click="isEditing = !isEditing"
      >
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
        <user-form v-model="isEditing" v-bind:userProperties="userProperties" v-bind:user="user" :beDisabled="true" @validateForm="updateUser">
          Salva modifiche
        </user-form>
    </v-card-text>
   
    <v-snackbar
      v-model="hasSaved"
      :timeout="2000"
      absolute
      bottom
      left
    >
      Il profilo dell'utente è stato aggiornato
    </v-snackbar>
  </v-card>
</template>

<script>
import UserForm from '@/components/user/UserForm'
import {userPropsFilteredBuilder} from './userProperties';

export default {
    props:{
        user: {
            required: true
        }
    },
    components: {
        'user-form': UserForm
    },
    data: () => ({
        isEditing: false,
        hasSaved: false
    }),
    methods:{
        updateUser(user){
          this.$store.dispatch("updateUserData", user)
          .then(response => {
              this.showAlert = true
              this.$refs.alert.changeConfig(UPDATED_INFO, "success")
              this.opened = false;
          })
          .catch(err => {
              this.hasSaved = true
          });
        }
    },
    computed: {
      userProperties: function () {
        return userPropsFilteredBuilder(this.user, 'firebase_uid', 'email','name','surname','nickname')
      }
    }
}
</script>