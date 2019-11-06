<template>
  <v-card
    class="overflow-hidden"
    min-width="500"
  >
    <v-toolbar
      flat
      color="secondary"
      class="white--text"
    >
      <v-icon color="white">mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">Profilo utente</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn
        color="primary"
        fab
        small
        @click="isEditing = !isEditing"
      >
        <v-icon  v-if="isEditing">mdi-close</v-icon>
        <v-icon  v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
        <user-form v-model="isEditing" 
        v-bind:userProperties="userProperties" 
        v-bind:user="user" 
        :beDisabled="true" 
        actionName="Aggiorna"
        @validateForm="updateUser">
        
          <v-btn @click="$emit('changepasswordclicked',true)">
              Cambia password
          </v-btn>
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
        hasSaved: false,
        flipped: false
    }),
    methods:{
        updateUser(user){
          this.$store.dispatch("user/updateUserData", user)
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
        return userPropsFilteredBuilder(this.user, 'email','name','surname','nickname')
      }
    }
}
</script>