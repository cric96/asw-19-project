<template>
    <v-container fluid>
      <v-speed-dial v-model="fabExpanded" bottom right fixed direction="top" transition="scale-transition">
        <template v-slot:activator>
          <v-btn fab light v-model="fabExpanded">
            <v-icon v-if="fabExpanded">close</v-icon>
            <v-icon v-else>add</v-icon>
          </v-btn>
        </template>
        <v-btn fab light @click='openCamera'>
            <v-icon>camera</v-icon>
            <input id="camera" type="file" accept="image/*" @change="onPhotoSelected" capture="camera" hidden=true />
        </v-btn>
        <v-btn fab light to="/manual">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-btn fab light>
            <v-icon>fa-barcode</v-icon>
        </v-btn>
      </v-speed-dial>
      
      <v-row dense>
          <v-col v-for="(bin, index) in bins" :key="index" cols="12" md="3">
            <bin :bin="bin"></bin>
          </v-col>
      </v-row>
    </v-container>
</template>


<script>
import DynamicBin from '@/components/DynamicBin.vue'
import Bin from '@/model/bin'

export default {
  components: {
    'bin': DynamicBin
  },
  data:() => ({
    fabExpanded: false,
    newTrash: false,
    score: 0,
    bins: [
      new Bin(300, ['Paper'], '#d50000'),
      new Bin(350, ['Plastic'], '#fdd835'),
      new Bin(20, ['Glass'], '#43a047')
      ]
  }),
  methods: {
    /**
     * change current child screen to manual screen
     */
    goToManual() {
      this.$router.replace('/manual')
    },
    openCamera() {
      document.getElementById('camera').click()
    },
    onPhotoSelected(event) {
      console.log(event.target.files[0])
      this.$router.push({name : 'AiInsertion', params : {img : event.target.files[0]}})
    }
  }
}
</script>