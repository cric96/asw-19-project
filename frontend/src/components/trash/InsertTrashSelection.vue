<template>
    <div>
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
      <!-- Floating action buttons -->
      <v-speed-dial v-model="fabExpanded"
                    bottom right fixed direction="left" 
                    transition="scale-transition" 
                    :loading="loaded">
        
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
    </div>
</template>

<script>
import ManualInsertionForm from '@/components/trash/ManualInsertionForm.vue'
import TrashSearchingPopUp from '@/components/trash/TrashSearchingPopUp.vue'
import { createNamespacedHelpers } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  components: {
    'manual-insertion-form': ManualInsertionForm,
    'trash-searching-pop-up' : TrashSearchingPopUp
  },
  data: () => ({
    fabExpanded: false,
    quality: 0.5
  }),
  computed: {
    ...mapGetters({
      activeBuilding: "building/activeBuilding",
      loaded : "trashCategories/loaded", //used to see if the trash category are loaded
    })
  },
  methods: {
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
}
</script>