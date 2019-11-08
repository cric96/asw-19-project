<template>
  <v-layout class="center">
    <v-card
      class="overflow-hidden width-max-600" outlined>
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
            <v-col cols="12" sm="auto" md="auto">
              <v-btn block @click="$emit('changepasswordclicked',true)">
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
        flipped: false
    }),
    methods:{
        updateUser(user){
          this.$store.dispatch("user/updateUserData", user)
          .then(response => {
              this.$refs.alert.changeConfig(UPDATED_INFO, "success")
              this.$store.dispatch('msg/addMessage', new Notification('Il profilo dell\'utente è stato aggiornato'))
          })
          .catch(err => {
            // TODO: handle error
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