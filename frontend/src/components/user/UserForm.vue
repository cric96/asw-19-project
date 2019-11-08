<template>
  <v-container v-if="finalUser" fluid>
    <v-form ref="form" v-model="valid" @keyup.native.enter="validate" :max-width="maxwidth">
      <v-row v-for="property in userProperties" :key="property.propertyName">
          <password-text-field 
              v-if="property.propertyName==='password'"
              v-model="user.password"
              :withConfirmation="true" 
              :outlined="true"
              :required="true"
              :clearable="true"
          />
          <v-text-field
            v-else
            :disabled="beDisabled && (!property.editable || !isEditing)"
            v-model="finalUser[property.propertyName]"
            :label="property.propertyLabel"
            :rules="property.propertyRule"
            :prependIcon="property.prependedIcon"
            outlined
            clearable
          ></v-text-field>
      </v-row>
      <v-row>
        <v-btn :disabled="!valid && !isEditing && loading" color="success" class="mr-4" @click="validate" :loading="loading">
          {{actionName}}
        </v-btn>
        <v-btn v-if="resettable" color="error" @click="reset" :disabled="loading">Reset Form</v-btn>
    
        <slot></slot>
        
      </v-row>
      
    </v-form>
  </v-container>
</template>

<script>
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
            }
    
  },
  watch: {
    user: {
      immediate: true,
      handler: function(val) {
        this.finalUser = val;
      }
    }
  },
  methods: {
    validate: function() {
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