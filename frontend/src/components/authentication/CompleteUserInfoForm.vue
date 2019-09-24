<template>
  <v-dialog :value="opened"  @input="opened = $event.target.value; emit('input', $event.target.value)" persistent max-width="600px">
    <v-card>
      <alert-message ref="alert" v-model="alertVisible"></alert-message>
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
                    required></v-text-field>
                </v-col>
              </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="opened = false" :disabled="pendingOperation">Chiudi</v-btn>
        <v-btn color="blue darken-1" :disabled="!valid" :loading="pendingOperation" text @click="save">Completa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import User from "../../model/user"
import AlertMessageComponent from '@/components/AlertMessageComponent'

export default {
  components: {
    'alert-message': AlertMessageComponent
  },
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
    alertVisible: false,
    finalUser: null,
    generalRules: [v => !!v || "Questo campo è obbligatorio"],
    valid: true,
    opened: false,
    pendingOperation: false
  }),
  watch: {
    value: {
      immediate: true,
      handler: function(val) {
        this.opened = val
      }
    },
    user: {
      immediate: true,
      handler: function(val) {
        this.finalUser = Object.assign({}, val)
      }
    }
  },
  methods:{
    save: function() {
      if(this.$refs.form.validate()) {
        this.pendingOperation = true
        this.$store.dispatch('updateUserData', this.finalUser).then(response => {
          this.$refs.alert.changeConfig('Informazioni aggiornate', 'success')
          this.alertVisible = true
          this.opened = false
        }).catch(err => {
          this.alertVisible = true
          this.$refs.alert.changeConfig("Errore durante l'aggiornamento. Riprovare", "error")
        }).finally(() => {
          this.pendingOperation = false
        })
      }
    }
  }
}
</script>

