<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-alert color="primary" :type="alert.type" dense v-model="alert.visible">
        {{ alert.message }}
      </v-alert>
      <v-card-title>
        <span class="headline">Completa la registrazione</span>
      </v-card-title>
      <v-card-text>
        <v-container v-if="finalUser" fluid>
          <v-form ref="form" v-model="valid" lazy-validation>
              <v-row v-for="propertyName in userProperties" :key="propertyName">
                <v-col cols="12">
                  <v-text-field v-model="finalUser[propertyName]" 
                    :label="propertyName"
                    :rules="generalRules" 
                    :value="finalUser[propertyName]" 
                    required></v-text-field>
                </v-col>
              </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="show = false">Chiudi</v-btn>
        <v-btn color="blue darken-1" :disabled="!valid" text @click="save">Completa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import User from "../../model/user";

export default {
  props: {
    user: {
      type: User,
      required: true
    },
    value: Boolean
  },
  data: () => ({
    userProperties: [
      'name',
      'surname',
      'nickname'
    ],
    alert: {
      visible: false,
      message: "",
      type: undefined
    },
    finalUser: null,
    generalRules: [v => !!v || "Questo campo è obbligatorio"],
    valid: true
  }),
  watch: {
    user: {
      immediate: true,
      handler: function(val) {
        this.finalUser = val;
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods:{
    save: function() {
      if(this.$refs.form.validate()) {
        this.$store.dispatch('updateUserData', this.finalUser).then(response => {
          console.log('sadasd');
          this.alert.type = "success";
          this.alert.visible = true;
          this.alert.message = "Informazioni aggiornate";
          this.value = false;
        }).catch(err => {
          this.alert.type = "error"
          this.alert.message = "Errore durante l'aggiornamento. Riprovare"
          this.alert.visible = true
        });
      }
    }
  }
};
</script>

