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
                        :items="categoriesAndBins"
                        flat
                        hide-no-data
                        hide-details
                        label="Digita..."
                        solo
                        item-text="categoryName"
                        item-value="categoryName"
                        menu-props="auto"                    
                    >
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-avatar>
                            <img :src="data.item.trashAvatar">
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title v-html="data.item.categoryName"></v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.binName"></v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
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
  import { mapGetters } from 'vuex'
  import trashesApi from '@/services/trashesApi'
  const { mapActions } = createNamespacedHelpers('trashCategories')

  export default {
    data: () => ({
        value: false, //true the dialog is opened, false the dialog is closed
        category: '', //the category found
        confirmDisabled: true //confirm is disable as long as the user write a trash category 
    }),
    computed: {
      ...mapGetters({
        'categories' : 'trashCategories/categories',
        'binFromTrashCategoryName' : 'building/binFromTrashCategoryName',
        'bins' : 'building/bins'
      }),
      categoriesAndBins : function(){
        if(this.bins.length == 0) { //used to prevent console error if the system fetches this component before bins
          return []
        }
        return this.categories.map(category => {
          return {
            categoryName : category.name, 
            binName : this.binFromTrashCategoryName(category.name).binCategory.name, 
            trashAvatar: category.image
          }
        })
      }
    },
    watch: {
      category: function(val) { //watch category value, when there is some value, user can confirm the category
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
        //fetch the category from the name
        this.categoryByName(this.category).then(category => {
          let buildingId = this.$store.state.building.activeBuilding
          //put the trash into backend
          return trashesApi.insertTrash(buildingId, { "name" : category.name })
            .then(() => {
              this.$store.dispatch('msg/addMessage', 'Hai guadagnato '+ category.score + ' punti')
              this.$store.commit('auth/updateScore', category.score)
            })
        })
        .catch(err => console.log(err)) //find a way to show erros
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