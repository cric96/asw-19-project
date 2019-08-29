<template>
    <v-layout align-center justify-center>
        <v-toolbar >
            <v-toolbar-title>Tipologia di rifiuto</v-toolbar-title>
            <!-- loading is used to show the loading time 
                 items are the item showed in the dropdown menu after typing,
            -->
            <v-autocomplete
                v-model="category"
                :loading="loading"
                :items="categories"
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                label="Digita..."
                solo-inverted
            ></v-autocomplete>
            <v-btn icon @click="onAccept">
              <v-icon>done</v-icon>
            </v-btn>
    </v-toolbar>
    </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        loading: false,
        //mockup, remember to load right trash categories via store(?)
        categories: [
          'Plastic',
          'Glass',
          'Metal',
          'Paper',
        ],
        category: ''
      }
    },
    methods: {
      onAccept() {
        console.log(this.category)
      }
    }
  
  }
</script>