<template>
    <v-container fluid>
      <!-- popups -->
      <manual-insertion-form ref="manualInsertionPopUp"/>
      <trash-searching-pop-up ref="trashSearchingPopUp"/>
      <!-- Content loader -->
      <v-row v-if="loading" justify="center">
        <content-loader :loading="loading"></content-loader>
      </v-row>
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
      
      <v-row dense v-if="!loading">
        <v-col v-for="(bin, index) in bins" :key="index" cols="12" md="6" sm="6">
          <bin :bin="bin"></bin>
        </v-col>
      </v-row>
    </v-container>
</template>


<script>
import DynamicBin from '@/components/DynamicBin.vue'
import ManualInsertionForm from '@/components/ManualInsertionForm.vue'
import TrashSearchingPopUp from '@/components/TrashSearchingPopUp.vue'
import ApiBin from "@/services/bins.api";
import { ScaleLoader } from '@saeris/vue-spinners'
import { createNamespacedHelpers } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  components: {
    'bin': DynamicBin,
    'content-loader': ScaleLoader,
    'manual-insertion-form': ManualInsertionForm,
    'trash-searching-pop-up' : TrashSearchingPopUp
  },
  data: () => ({
    fabExpanded: false,
    newTrash: false,
    manualOpened: false,
    score: 0,
    bins: null
  }),
  computed: {
    ...mapGetters({
      activeBuilding: "building/activeBuilding",
      areLoaded : "trashCategories/areLoaded"
    }),
    loading: function() {
      return !this.bins
    }
  },
  watch: {
    activeBuilding(val) {
      ApiBin.getBins(this.activeBuilding).then(bins => {
        this.bins = bins
      });
    }
  },
  methods: {
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