<template>
    <div>
        <v-dialog v-model="value" persistent transition="dialog-bottom-transition" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Tipologia di rifiuto</span>
                </v-card-title>
                <v-toolbar >
                    <!-- loading is used to show the loading time 
                        items are the item showed in the dropdown menu after typing,
                    -->
                    <v-autocomplete
                        v-model="category"
                        :items="categories.map(category => category.name)"
                        flat
                        hide-no-data
                        hide-details
                        label="Digita..."
                        solo
                        menu-props="auto"                    
                    ></v-autocomplete>
                    <v-btn icon @click="onAccept" :disabled="confirmDisabled">
                        <v-icon>done</v-icon>
                    </v-btn>
                    <v-btn icon @click="close">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
  import { createNamespacedHelpers } from 'vuex'
  import trashesApi from '../services/trashesApi'
  const { mapGetters, mapActions } = createNamespacedHelpers('trashCategories');

  export default {
    data: () => ({
        value: false,
        category: '',
        confirmDisabled: true
    }),
    computed: {
      ...mapGetters([
        'categories'
      ])
    },
    watch: {
      category: function(val) {
        if(!val) {
          this.confirmDisabled = true
        } else {
          this.confirmDisabled = false
        }
      }
    },
    methods: {
      ...mapActions([
        'categoryByName'
      ]),
      onAccept() {
        this.categoryByName(this.category).then(category => {
          let buildingId = this.$store.state.building.activeBuilding
          return trashesApi.insertTrash(buildingId, { "name" : category.name })
            .then(() => {
              this.$store.dispatch('msg/addMessage', 'Hai guadagnato '+ category.score + ' punti')
              this.$store.commit('updateScore', category.score)
            })
        })
        .catch(err => console.log(err))
        .finally(() => this.close())
      },
      open() {
        this.value = true
      },
      close() {
        this.category = ""
        this.value = false
      }
    }
  
  }
</script>