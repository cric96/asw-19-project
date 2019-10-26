<template>
    <v-layout>
      <!-- Content loader -->
      <v-layout v-if="loadingBins" row wrap align-center justify-center>
        <loader></loader>
      </v-layout>
    
      <v-layout v-else>
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

      <insert-trash-selection v-if="canInsertTrash"/>
      
    </v-layout>
</template>


<script>
import BinsBoard from '@/components/bin/BinsBoard.vue'
import InsertTrashSelection from '@/components/trash/InsertTrashSelection.vue'
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
    'trash-history' : TrashHistoryVisualization
  },
  data: () => ({
    binsAreLoadings: true
  }),
  computed: {
    ...mapGetters({
      activeBuilding: "building/activeBuilding",
      bins : "building/bins"
    }),
    loadingBins: function() {
      return this.binsAreLoadings
    },
    canInsertTrash: function() {
      return this.activeBuilding && !this.loadingBins
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
      if(this.activeBuilding) {
        this.binsAreLoadings = true
        this.$store.dispatch("building/fetchBinsOfActiveBuilding")
          .finally(() => this.binsAreLoadings = false)
      }
    }
  }
}
</script>