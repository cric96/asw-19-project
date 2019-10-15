<template>
    <v-layout>
      <!-- Content loader -->
      <v-layout v-if="loadingBins" row wrap align-center justify-center>
        <content-loader :loading="loadingBins"></content-loader>
      </v-layout>

      <v-layout v-else>
        <v-row dense>
          <v-col cols="12">
            <bins-board :bins="bins"></bins-board>
          </v-col>
        </v-row>
      </v-layout>

      <insert-trash-selection v-if="canInsertTrash"/>
      
    </v-layout>
</template>


<script>
import BinsBoard from '@/components/bin/BinsBoard.vue'
import InsertTrashSelection from '@/components/trash/InsertTrashSelection.vue'
import ApiBin from "@/services/binsApi";
import { ScaleLoader } from '@saeris/vue-spinners'
import { createNamespacedHelpers } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  components: {
    'bins-board': BinsBoard,
    'content-loader': ScaleLoader,
    'insert-trash-selection' : InsertTrashSelection
  },
  data: () => ({
    binsAreLoadings: false,
    quality: 0.5
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
};
</script>
<style>
#fileInput {
  display: none;
}
</style>