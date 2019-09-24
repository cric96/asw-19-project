<template>
  <v-card
    class="overflow-hidden"
    color="grey lighten-1"
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
        <user-form user-form v-bind:userProperties="userProperties" v-bind:user="user" @validateForm="updateUser">
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
import UserForm from '@/components/UserForm'
import {userPropsFiltered} from './userProperties';

export default {
    props:{
        user: {
            type: User,
            required: true
        }
    },
    components: {
        'user-form': UserForm
    },
    data: () => ({
        isEditing: false,
        hasSaved : false,
        userProperties: userPropsFiltered('uid', 'email','password','confirmPassword','name','surname','nickname')
    }),
    mounted() {
        console.log(this.userProperties)
    },
    methods:{
      updateUser(user){
        hasSaved=true
      }
    }
}
</script>