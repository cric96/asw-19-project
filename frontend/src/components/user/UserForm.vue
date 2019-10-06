<template>
  <v-container v-if="finalUser" fluid>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row v-for="property in userProperties" :key="property.propertyName">
        <v-col cols="12">
          <v-text-field
            :disabled="beDisabled && (!property.editable || !isEditing)"
            v-model="finalUser[property.propertyName]"
            :label="property.propertyLabel"
            :rules="property.propertyRule"
            
            outlined
            clearable
            :append-icon="appendIcon(property)"
            :type="textType(property)"
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn :disabled="!valid && !isEditing " color="success" class="mr-4" @click="validate">
        <slot></slot>
      </v-btn>
      <v-btn v-if="resettable" color="error" @click="reset">Reset Form</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import User from "@/model/user";

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
    value: {
      type: Boolean,
      default: false
    }  
  },
  data: () => ({
    finalUser: null,
    valid: false,
    passwordShow: false,
  }),
  computed: {
    isEditing: {
      get() {
        return this.value;
      }
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
    },
    appendIcon(property){
      if(property.propertyName=='password' || property.propertyName=='confirmPassword') {
        return (this.passwordShow) ? 'visibility' : 'visibility_off'
      }else{
        return undefined
      }
    },
    textType(property){
      if(property.propertyName=='password' && this.passwordShow) {
        return 'text'
      }else if(property.propertyName=='password' && !this.passwordShow){
        return 'password'
      }else{
        return 'text'
      }
    }
  }
};
</script>