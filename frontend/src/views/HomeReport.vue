<template>
  <v-container fluid>
    <!-- Content loader -->
    <v-row v-if="loading" justify="center">
      <content-loader :loading="loading"></content-loader>
    </v-row>

    <v-speed-dial
      v-model="fabExpanded"
      bottom
      right
      fixed
      direction="top"
      transition="scale-transition"
    >
      <template v-slot:activator>
        <v-btn fab light v-model="fabExpanded">
          <v-icon v-if="fabExpanded">close</v-icon>
          <v-icon v-else>add</v-icon>
        </v-btn>
      </template>
      <v-btn fab light @click="openCamera("camera")">
        <v-icon>camera</v-icon>
        <input
          id="camera"
          type="file"
          accept="image/*"
          @change="onPhotoSelectedCamera"
          capture="camera"
          hidden="true"
        />
      </v-btn>
      <v-btn fab light to="/manual">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn fab light @click="openCamera("barcode")">
        <v-icon>fa-barcode</v-icon>
        <input
          id="barcode"
          type="file"
          accept="image/*"
          @change="onPhotoSelectedBarcode"
          capture="camera"
          hidden="true"
        />
      </v-btn>
    </v-speed-dial>

    <v-row dense v-if="!loading">
      <v-col v-for="(bin, index) in bins" :key="index" cols="12" md="3" sm="4">
        <bin :bin="bin"></bin>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import DynamicBin from "@/components/DynamicBin.vue";
import ApiBin from "@/services/bins.api";
import { ScaleLoader } from "@saeris/vue-spinners";
import { mapGetters } from "vuex";

export default {
  components: {
    bin: DynamicBin,
    "content-loader": ScaleLoader
  },
  data: () => ({
    fabExpanded: false,
    newTrash: false,
    score: 0,
    bins: null
  }),
  computed: {
    ...mapGetters({
      activeBuilding: "building/activeBuilding"
    }),
    loading: function() {
      return !this.bins;
    }
  },
  watch: {
    activeBuilding(val) {
      ApiBin.getBins(val._id).then(bins => {
        console.log("Bins");
        console.log(bins);
      });
    }
  },
  methods: {
    /**
     * change current child screen to manual screen
     */
    goToManual() {
      this.$router.replace("/manual");
    },
    openCamera(id) {
      document.getElementById(id).click();
    },
    onPhotoSelectedCamera(event) {
      this.$router.push({
        name: "AiInsertion",
        params: { img: event.target.files[0] }
      });
    },
    onPhotoSelectedBarcode(event) {
      this.$router.push({
        name: "BarcodeInsertion",
        params: { img: event.target.files[0] }
      });
    }
  }
};
</script>