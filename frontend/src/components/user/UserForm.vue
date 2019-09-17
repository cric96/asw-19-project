<template>
  <v-container v-if="finalUser" fluid>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row v-for="property in userProperties" :key="property">
        <v-col cols="12">
          <v-text-field
            v-if='property.propertyName==="password"'
            v-model="finalUser[property.propertyName]"
            :label="property.propertyName"
            :rules="property.propertyRule"
            :disabled="isEditing && property.editable"
            required
            outlined
            clearable
            :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
            :type="passwordShow ? 'text' : 'password'"
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
          <v-text-field
            v-if='property.propertyName==="password"'
            label="Confirm password"
            :rules="v=>v==finalUser[password]"
            :disabled="isEditing && property.editable"
            required
            outlined
            clearable
            :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
            :type="passwordShow ? 'text' : 'password'"
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
          <v-text-field
            v-else
            :disabled="isEditing && property.editable"
            v-model="finalUser[propertyName]"
            :label="property.propertyName"
            :rules="property.propertyRule"
            required
            outlined
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        <slot></slot>
      </v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </v-form>
  </v-container>
</template>



<script>
import User from "../../model/user";

export default {
  props: {
    user: {
      required: true
    },
    userProperties: {
      type: Array
    },
    value: Boolean
  },
  data: () => ({
    finalUser: null,
    valid: true,
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
        $emit("validateForm", finalUser);
      }
    },
    reset: function() {
      this.$refs.form.reset();
    }
  }
};
</script>