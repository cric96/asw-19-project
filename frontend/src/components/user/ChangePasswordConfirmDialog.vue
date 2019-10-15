<template>
      <v-dialog v-model="show" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Sei sicuro di voler cambiare la password con quella appena inserita? </v-card-title>
          <v-card-text>Il cambio della password è una procedura irreversibile. Premi il tasto conferma sei sei sicuro di cambiare la tua password con quella appena inserita, altrimenti premi annulla. </v-card-text>
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