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
      <v-row v-if="actionName || resettable">
          <v-col v-if="actionName" cols="12" sm="auto" md="auto">      
            <v-btn block :disabled="!valid && !isEditing && loading" color="success" class="mr-4" @click="validate" :loading="loading">
              {{actionName}}
            </v-btn>
          </v-col>
          <v-col v-if="resettable" cols="12" sm="auto" md="auto">
              <v-btn v-if="resettable" block color="error" @click="reset" :disabled="loading">Reset Form</v-btn>
          </v-col>
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