<template>
  <v-dialog
    :value="opened"
    @input="opened = $event.target.value; emit('input', $event.target.value)"
    persistent
    max-width="600px"
  >
    <v-card>
    	<alert v-model="showAlert" ref="alert"/>
	  	<v-card-title>
        	<span class="headline">Completa la registrazione</span>
      	</v-card-title>
      	<v-card-text>
			<user-form
			v-bind:userProperties="userProperties"
			v-bind:user="user"
			@validateForm="updateUser"
			>Completa profilo</user-form>
      	</v-card-text>
      	<v-card-actions>
        	<div class="flex-grow-1"></div>
        	<v-btn color="blue darken-1" text @click="opened = false">Chiudi</v-btn>
      	</v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import User from "@/model/user";
import UserForm from "@/components/user/UserForm";
import { userPropsFilteredBuilder } from "@/components/user/userProperties";
import AlertMessageComponent from '@/components/AlertMessageComponent';
import * as messages from '@/resource/messages';

export default {
  components: {
	"alert": AlertMessageComponent, 
    "user-form": UserForm
  },
  props: {
    user: {
      type: User,
      required: true
    },
    value: Boolean
  },
  watch: {
    value: {
      immediate: true,
      handler: function(val) {
        this.opened = val
      }
    },
  },	
  data: () => ({
	userProperties: userPropsFilteredBuilder(this.user,"name","surname","nickname"),
    showAlert: false,
    valid: true,
    opened: false
  }),
  methods: {
    updateUser: function(user) {
      this.$store.dispatch("updateUserData", this.finalUser)
        .then(response => {
          	this.showAlert = true
        	this.$refs.alert.changeConfig(UPDATED_INFO, "success")
          	this.opened = false;
        })
        .catch(err => {
          
        });
    }
  }
};
</script>

