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
        <v-col v-for="n in 4" :key="n" cols="12" md="4">
          <v-card >
            <bin color="primary"></bin>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
</template>


<script>
import Bin from '@/components/Bin.vue'

export default {
  components: {
    'bin': Bin
  },
  data:() => ({
    fabExpanded: false,
    newTrash: false,
    score: 0
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