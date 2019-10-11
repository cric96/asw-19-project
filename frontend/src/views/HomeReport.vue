<template>
    <v-layout>
      <!--TODO refactor-->
      <!-- popups -->
      <manual-insertion-form ref="manualInsertionPopUp"/>
      <trash-searching-pop-up ref="trashSearchingPopUp"/>
      <!-- image resizer-->
      <image-uploader
        hidden
        id="ia-insertion"
        capture="camera"
        :maxWidth="512"
        :quality="quality"
        outputFormat="blob"
        @input="onPhotoSelectedAi"
      />
      <image-uploader
        hidden
        id="barcode-insertion"
        capture="camera"
        :maxWidth="1024"
        outputFormat="blob"
        @input="onPhotoSelectedBarcode"
      />
      <!-- Content loader -->
      <v-layout v-if="loading" row wrap align-center justify-center>
        <content-loader :loading="loading"></content-loader>
      </v-layout>

      <v-layout v-else>
        <v-row dense>
          <v-col cols="12">
            <bins-board :bins="bins"></bins-board>
          </v-col>
        </v-row>
      </v-layout>

      <!-- Floating action buttons -->
      <v-speed-dial v-if="activeBuilding" 
                          v-model="fabExpanded"
                          bottom right fixed direction="left" 
                          transition="scale-transition" 
                          :loading="areLoaded">
        <template v-slot:activator>
          <v-btn fab light v-model="fabExpanded">
            <v-icon v-if="fabExpanded">close</v-icon>
            <img style="width: 35%" v-else src="@/assets/addTrash.png"/>
          </v-btn>
        </template>
        <v-btn fab light @click='openCamera("ia-insertion")'>
            <v-icon>camera</v-icon>
        </v-btn>
        <v-btn fab light @click="openManualForm">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-btn fab light @click='openCamera("barcode-insertion")'>
            <img style="width: 32%" src="@/assets/barcode.png"/>
        </v-btn>
      </v-speed-dial>
    </v-layout>
</template>


<script>
import BinsBoard from '@/components/bin/BinsBoard.vue'
import ManualInsertionForm from '@/components/trash/ManualInsertionForm.vue'
import TrashSearchingPopUp from '@/components/trash/TrashSearchingPopUp.vue'
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
    binsAreLoadings: false,
    quality: 0.5
  }),
  computed: {
    ...mapGetters({
      activeBuilding: "building/activeBuilding",
      areLoaded : "trashCategories/areLoaded", //used to see if the trash category are loaded
      bins : "building/bins"
    }),
    loading: function() {
      return this.binsAreLoadings
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
    },
    openManualForm() {
      this.$refs.manualInsertionPopUp.open()
    },
    openCamera(ref) {
      document.getElementById(ref).click();
    },
    onPhotoSelectedAi(image) {
      this.$refs.trashSearchingPopUp.open()
      this.$refs.trashSearchingPopUp.aiPrediction(image)
    },
    onPhotoSelectedBarcode(image) {
      this.$refs.trashSearchingPopUp.open()
      this.$refs.trashSearchingPopUp.barcodePrediction(image)
    }
  }
};
</script>
<style>
#fileInput {
  display: none;
}
</style>