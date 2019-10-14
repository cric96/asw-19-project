<template>
  <v-container v-if="finalUser" fluid>
    <v-form ref="form" v-model="valid" @keyup.native.enter="validate">
      <v-row v-for="property in userProperties" :key="property.propertyName">
          <password-text-field
              v-if="property.propertyName==='password'"
              :prependIcon="property.prependedIcon"
              :passwordModel="user.password"
              :toCheck="undefined"
              :labelDescription="property.propertyLabel"
              :passwordRules="passwordRuleComp"
          ></password-text-field>
          <password-text-field
              v-else-if="property.propertyName==='passwordConfirm'"
              :prependIcon="property.prependedIcon"
              :passwordModel="newPasswordConfirmation"
              :toCheck="user.password"
              :labelDescription="property.propertyLabel"
              :passwordRules="passwordRuleComp"
          ></password-text-field>
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
      <v-btn :disabled="!valid && !isEditing && loading" color="success" class="mr-4" @click="validate" :loading="loading">
        <slot></slot>
      </v-btn>
      <v-btn v-if="resettable" color="error" @click="reset" :disabled="loading">Reset Form</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import User from "@/model/user";
import { passwordRule } from "@/components/user/userProperties";
import PasswordTextField from "@/components/authentication/PasswordTextField";

export default {
  props: {
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
    value: {
      type: Boolean,
      default: false
    }  
  },
  data: () => ({
    finalUser: null,
    valid: true,
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