<template>
    <v-layout>
      <!-- popups -->
      <manual-insertion-form ref="manualInsertionPopUp"/>
      <trash-searching-pop-up ref="trashSearchingPopUp"/>
      <!-- Content loader -->
      <v-layout v-if="loading" row wrap align-center justify-center>
        <content-loader :loading="loading"></content-loader>
      </v-layout>

      <v-layout v-else>
        <v-row dense>
          <v-col cols="12">
            <bins-board :bins="bins.data"></bins-board>
          </v-col>
        </v-row>
      </v-layout>

      <!-- Floating action buttons -->
      <v-speed-dial v-if="areLoaded" v-model="fabExpanded" bottom right fixed direction="left" transition="scale-transition" >
        <template v-slot:activator>
          <v-btn fab light v-model="fabExpanded">
            <v-icon v-if="fabExpanded">close</v-icon>
            <img style="width: 35%" v-else src="@/assets/addTrash.png"/>
          </v-btn>
        </template>
        <v-btn fab light @click='openCamera("ai")'>
            <v-icon>camera</v-icon>
            <input ref="ai" type="file" accept="image/*" @change="onPhotoSelectedAi" capture="camera" hidden=true />
        </v-btn>
        <v-btn fab light @click="openManualForm">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-btn fab light @click='openCamera("barcode")'>
            <img style="width: 32%" src="@/assets/barcode.png"/>
            <input ref="barcode" type="file" accept="image/*" @change="onPhotoSelectedBarcode" capture="camera" hidden=true />
        </v-btn>
      </v-speed-dial>
      <v-btn v-else fab light bottom right fixed :loading="true"> </v-btn> 
      
    </v-layout>
</template>


<script>
import BinsBoard from '@/components/bin/BinsBoard.vue'
import ManualInsertionForm from '@/components/ManualInsertionForm.vue'
import TrashSearchingPopUp from '@/components/TrashSearchingPopUp.vue'
import ApiBin from "@/services/binsApi";
import { ScaleLoader } from '@saeris/vue-spinners'
import { createNamespacedHelpers } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  components: {
    'bins-board': BinsBoard,
    'content-loader': ScaleLoader,
    'manual-insertion-form': ManualInsertionForm,
    'trash-searching-pop-up' : TrashSearchingPopUp
  },
  data: () => ({
    fabExpanded: false,
    newTrash: false,
    manualOpened: false,
    score: 0,
    bins: {
      loading: false,
      data: null
    }
  }),
  computed: {
    ...mapGetters({
      activeBuilding: "building/activeBuilding",
      areLoaded : "trashCategories/areLoaded"
    }),
    loading: function() {
      return this.bins.loading
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
        this.bins.loading = true
        ApiBin.getBins(this.activeBuilding).then(bins => {
          this.bins.data = bins
        }).finally(() => this.bins.loading = false);
      }
    },
    /**
     * change current child screen to manual screen
     */
    openManualForm() {
      this.$refs.manualInsertionPopUp.open()
    },
    openCamera(ref) {
      this.$refs[ref].click()
    },
    onPhotoSelectedAi(event) {
      this.$refs.trashSearchingPopUp.open()
      this.$refs.trashSearchingPopUp.aiPrediction(event.target.files[0])
    },
    onPhotoSelectedBarcode(event) {
      this.$refs.trashSearchingPopUp.open()
      this.$refs.trashSearchingPopUp.barcodePrediction(event.target.files[0])
    }
  }
};
</script>