<template>
    <v-container fluid>
      <v-speed-dial v-model="fabExpanded" bottom right fixed direction="top" transition="scale-transition">
        <template v-slot:activator>
          <v-btn fab light v-model="fabExpanded">
            <v-icon v-if="fabExpanded">close</v-icon>
            <v-icon v-else>add</v-icon>
          </v-btn>
        </template>
        <v-btn fab light>
            <v-icon>camera</v-icon>
        </v-btn>
        <v-btn fab light>
            <v-icon>edit</v-icon>
        </v-btn>
        <v-btn fab light>
            <v-icon>fa-barcode</v-icon>
        </v-btn>
      </v-speed-dial>
      
      <v-row dense>
        <v-col v-for="n in 4" :key="n" cols="12" md="4">
          <v-card >
            <v-card-text>ciaoo</v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
</template>


<script>
export default {
  data:() => ({
    fabExpanded: false
  })
}
</script>