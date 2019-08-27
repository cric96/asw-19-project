<template>
    <v-layout align-center justify-center>
        <v-toolbar >
            <v-toolbar-title>Trash category</v-toolbar-title>
            <!-- loading is used to show the loading time 
                 items are the item showed in the dropdown menu after typing     
            -->
            <v-autocomplete
                v-model="select"
                :loading="loading"
                :items="categories"
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                label="Start typing..."
                solo-inverted
            ></v-autocomplete>
            <v-btn icon>
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
      }
    },
  }
</script>