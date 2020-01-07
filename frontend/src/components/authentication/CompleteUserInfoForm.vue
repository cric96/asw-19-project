<template>
  <v-dialog
    :value="opened"
    @input="opened = $event.target.value; emit('input', $event.target.value)"
    persistent
    max-width="600px"
  >
    <v-card>
    	<v-card-title class="secondary headline white--text" primary-title>
        	Complete the registration
      </v-card-title>
      <alert class="mt-3 mx-3" text v-model="showAlert" ref="alert"/>
      <v-card-text>
        <user-form ref="form"
          v-bind:userProperties="userProperties"
          v-bind:user="user"
          :value="valid"
          @validateForm="updateUser">
          </user-form>
      </v-card-text>
      <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="validateForm" :disabled="!valid">Save</v-btn>
          <v-btn color="primary" text @click="opened = false">Close</v-btn>
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
    showAlert: false,
    valid: true,
    pendingOperation: false,
    opened: false
  }),
  methods: {
    validateForm: function() {
      this.$refs.form.validate();
    },
    updateUser: function(user) {
      this.pendingOperation = true
      this.showAlert = false
      this.$store.dispatch("user/updateUserData", user)
      .then(response => {
          this.showAlert = true
          this.$refs.alert.showSuccess(messages.UPDATED_INFO)
          this.opened = false;
      })
      .catch(err => {
        this.showAlert = true
        this.$refs.alert.showError(
          (err.status == 400) ? // this means bad request for existing nickname
          messages.SIGNUP_ERR_NICKNAME_CONFLICT : 
          messages.UPDATE_INFO_ERR 
        )
      }).finally(() => {
        this.pendingOperation = false
      })
    }
  }, 
  computed: {
    userProperties: function () {
      return userPropsFilteredBuilder(this.user, 'name','surname','nickname')
    }
  },
};
</script>

