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
                :items="categories.map(category => category.name)"
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                label="Digita..."
                solo-inverted
            ></v-autocomplete>
            <v-btn icon @click="onAccept" :disabled="confirmDisabled">
              <v-icon>done</v-icon>
            </v-btn>
    </v-toolbar>
    </v-layout>
</template>
<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapGetters } = createNamespacedHelpers('trashCategories');

  export default {
    data () {
      return {
        loading: false,
        category: '',
        confirmDisabled: true,
        score : 8
      }
    },
    computed: {
      ...mapGetters([
        'categories'
      ])
    },
    watch: {
      category: function(val) {
        console.log(val)
        if(!val) {
          this.confirmDisabled = true
        } else {
          this.confirmDisabled = false
        }
      }
    },
    methods: {
      onAccept() {
        this.$emit("score-received", this.score) 
        this.$router.push("/dashboard")
      }
    }
  
  }
</script>