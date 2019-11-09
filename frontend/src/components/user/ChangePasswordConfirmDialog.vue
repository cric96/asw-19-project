<template>
      <v-dialog v-model="show" persistent max-width="290">
        <v-card>
          <v-card-title class="roboto-s warning white--text">
            <v-icon class="mr-2" color="white">warning</v-icon>
            Attenzione! 
          </v-card-title>
          <v-divider/>
          <v-card-text class="mt-2">Sei sicuro di voler cambiare password? </v-card-text>
          
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="error" text @click="show = false">Annulla</v-btn>
            <v-btn color="success" text @click="$emit('confirmChange');show = false">Conferma</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
    props:{
        value: Boolean
    },
    computed: {
        show: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    }
}
</script>