<template>
  <v-container v-if="finalUser" fluid>
    <v-form ref="form" v-model="valid" @keyup.native.enter="validate">
      <v-row v-for="property in userProperties" :key="property.propertyName">
          <password-text-field
              v-if="property.propertyName==='password'"
              v-model="user.password"
              :prependIcon="property.prependedIcon"
              :toCheck="undefined"
              :labelDescription="property.propertyLabel"
              :passwordRules="passwordRuleComp"
          ></password-text-field>
          <password-text-field
              v-else-if="property.propertyName==='passwordConfirm'"
              :prependIcon="property.prependedIcon"
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
      <v-row class="justify-center">
      <v-btn class=" ma-4" :disabled="!valid && !isEditing && loading" color="success"  @click="validate" :loading="loading">
        <slot></slot>
      </v-btn>
      <v-btn class=" ma-4" v-if="resettable" color="error" @click="reset" :disabled="loading">Reset Form</v-btn>
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