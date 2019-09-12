<template>
    <v-container fluid>
      <!-- Content loader -->
      <v-row v-if="loading" justify="center">
        <content-loader :loading="loading"></content-loader>
      </v-row>
      <v-speed-dial v-if="areLoaded" v-model="fabExpanded" bottom right fixed direction="top" transition="scale-transition" >
        <template v-slot:activator>
          <v-btn fab light v-model="fabExpanded">
            <v-icon v-if="fabExpanded">close</v-icon>
            <img style="width: 35%" v-else src="@/assets/addTrash.png"/>
          </v-btn>
        </template>
        <v-btn fab light @click='openCamera("camera")'>
            <v-icon>camera</v-icon>
            <input id="camera" type="file" accept="image/*" @change="onPhotoSelectedCamera" capture="camera" hidden=true />
        </v-btn>
        <v-btn fab light to="/manual">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-btn fab light @click='openCamera("barcode")'>
            <img style="width: 32%" src="@/assets/barcode.png"/>
            <input id="barcode" type="file" accept="image/*" @change="onPhotoSelectedBarcode" capture="camera" hidden=true />
        </v-btn>
      </v-speed-dial>
      <v-btn v-else fab light bottom right fixed :loading="true"> </v-btn> 
      
      <v-row dense v-if="!loading">
          <v-col v-for="(bin, index) in bins" :key="index" cols="12" md="3" sm="4">
            <bin :bin="bin"></bin>
          </v-col>
      </v-row>
    </v-container>
</template>


<script>
import DynamicBin from '@/components/DynamicBin.vue'
import { ApiBin } from '../services/mockApiBin'
import { ScaleLoader } from '@saeris/vue-spinners'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('trashCategories');

export default {
  components: {
    'bin': DynamicBin,
    'content-loader': ScaleLoader
  },
  data:() => ({
    fabExpanded: false,
    newTrash: false,
    score: 0,
    bins: null
  }),
  computed: {
    loading: function() {
      return !this.bins;
    },
    ...mapGetters([
      'areLoaded'
    ])
    
  },
  mounted() {
    ApiBin.getAll("das").then(result => {
      this.bins = result;
    })
  },
  methods: {
    /**
     * change current child screen to manual screen
     */
    goToManual() {
      this.$router.replace('/manual')
    },
    openCamera(id) {
      document.getElementById(id).click()
    },
    onPhotoSelectedCamera(event) {
      this.$router.push({name : 'AiInsertion', params : {img : event.target.files[0]}})
    },
    onPhotoSelectedBarcode(event) {
      this.$router.push({name : 'BarcodeInsertion', params : {img : event.target.files[0]}})
    }
  }
}
</script>