<template>
    <v-layout>
      <!-- Content loader -->
      <v-layout v-if="buildingsIsLoading || binsAreLoading" row wrap align-center justify-center>
        <loader></loader>
      </v-layout>
    
      <v-layout v-else-if="canInsertTrash">
        <v-row dense>
          <v-col cols="12">
            <bins-board :bins="bins"></bins-board>
          </v-col>
          
        <v-divider></v-divider>
          <v-col cols="12">
            <trash-history></trash-history>
          </v-col>
        </v-row>
      </v-layout>

      <!-- No building selected or available, show an empty view-->
      <empty-view v-else-if="!areAvailableBuildings" class="full-vh align-center" icon="fas fa-home">
        <template slot="title">Nessuna abitazione attiva</template>
        <template slot="message">Crea ed imposta una nuova abitazione per iniziare a gettare rifiuti! :)</template>
        <template slot="actions">
          <v-btn color="orange" outlined text to="/buildings"> Gestisci abitazioni </v-btn>
        </template>
      </empty-view>

      <insert-trash-selection v-if="canInsertTrash"/>
      
    </v-layout>
</template>

<script>
import BinsBoard from '@/components/bin/BinsBoard.vue'
import InsertTrashSelection from '@/components/trash/InsertTrashSelection.vue'
import EmptyView from '@/components/EmptyView'
import ApiBin from "@/services/binsApi"
import Loader from '@/components/Loader'
import TrashHistoryVisualization from '@/components/visualization/TrashHistoryVisualization.vue'
import { createNamespacedHelpers } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  components: {
    'bins-board': BinsBoard,
    'loader': Loader,
    'insert-trash-selection' : InsertTrashSelection,
    'trash-history' : TrashHistoryVisualization,
    'empty-view': EmptyView
  },
  data: () => ({
    binsAreLoading: true
  }),
  computed: {
    ...mapGetters({
      buildingsIsLoading: "building/buildingsIsLoading",
      activeBuilding: "building/activeBuilding",
      buildings: "building/buildings",
      bins : "building/bins",
    }),
    canInsertTrash: function() {
      return this.areAvailableBuildings && this.activeBuilding && !this.binsAreLoading
    },
    areAvailableBuildings() {
      return !this.buildingsIsLoading && this.buildings.length > 0
    }
  },
  watch: {
    activeBuilding(val) {
      this.updateBins()
    }
  },
  mounted() {
    this.updateBins()
  },
  methods: {
    updateBins() {
      this.binsAreLoading = true
      this.$store.dispatch("building/fetchBinsOfActiveBuilding")
        .catch(err => {})
        .finally(() => this.binsAreLoading = false)
    }
  }
};
</script>