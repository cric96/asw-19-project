<template>
  <v-container v-if="finalUser" fluid>
    <v-form ref="form" v-model="valid" @keyup.native.enter="validate" :max-width="maxwidth">
      <template v-for="property in userProperties">
          <password-text-field 
              v-if="property.propertyName==='password'"
              :key="property.propertyName"
              v-model="finalUser.password"
              :withConfirmation="true" 
              :outlined="true"
              :required="true"
              :clearable="true"
          />
          <v-text-field
            v-else
            :key="property.propertyName"
            :disabled="beDisabled && (!property.editable || !isEditing)"
            v-model="finalUser[property.propertyName]"
            :label="property.propertyLabel"
            :rules="property.propertyRule"
            :prependIcon="property.prependedIcon"
            outlined
            clearable
          ></v-text-field>
      </template>
    </v-form>
    <v-row v-if="actionName || resettable">
          <v-col v-if="actionName" cols="12" sm="auto" md="auto">      
            <v-btn block :disabled="(!valid && !isEditing && loading) || !actionEnable" color="success" class="mr-4" @click="validate" :loading="loading">
              {{actionName}}
            </v-btn>
          </v-col>
          <v-col v-if="resettable" cols="12" sm="auto" md="auto">
              <v-btn v-if="resettable" block color="error" @click="reset" :disabled="loading">Reset Form</v-btn>
          </v-col>
          <slot></slot>
      </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import User from "@/model/user";
import { passwordRule } from "@/components/user/userProperties";
import PasswordTextField from "@/components/authentication/PasswordTextField";

export default {
  props: {
    maxwidth:{
      type: String
    },
    user: {
      required: true
    },
    userProperties: {
      type: Array
    },
    resettable: {
      type: Boolean,
      default : false
    },
    beDisabled: {
      type: Boolean,
      default : false
    },
    loading: {
      type: Boolean,
      default: false
    },
    actionName: {
      type : String
    },
    actionEnable : {
      type : Boolean,
      default : true
    },
    value: {
      type: Boolean,
      default: false
    }  
  },
  data: () => ({
    finalUser: null,
    valid: true,
    newPasswordConfirmation: null
  }),
  computed: {
    isEditing: {
      get() {
        return this.value;
      }
    },
    passwordRuleComp: function(){
        console.log("passRuleComp",passwordRule)
        return passwordRule;
    },
    ...mapGetters({
      'userFromVuex' : 'user/userProfile'
    })
  },
  watch: {
    userFromVuex: function(val) {
      console.log("new user")
      console.log(val)
    },
    user: {
      immediate: true,
      handler: function(val) {
        console.log("here")
        console.log(val)
        this.finalUser = Object.assign({},val);
      }
    }
  },
  methods: {
    validate: function() {
      console.log(this.finalUser)
      if (this.$refs.form.validate()) {
        this.valid = true
        this.$emit("validateForm", this.finalUser);
      }
    },
    reset: function() {
      this.$refs.form.reset();
    }
  },
  components: {
    "password-text-field": PasswordTextField
  }
};
</script>