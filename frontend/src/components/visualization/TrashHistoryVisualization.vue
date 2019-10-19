<template>
    <v-lazy v-model="initialize">
        <v-layout wrap>
           <v-col v-for="(filter,index) in filterTrashesBy" :key="filter" cols="12" md="6" sm="6">
              <v-lazy v-model="initialize[index]">
                <trash-chart :height="300" :filterBy="filter"/>
              </v-lazy>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-lazy v-model="initialize[4]">
              <comparison-chart :height="300"/>
            </v-lazy>
          </v-col>
        </v-layout> 
    </v-lazy>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import TrashHistoryChart from './TrashHistoryChart'
import TrashComparisonChart from './TrashComparisonChart'
export default {
    name: "TrashHistoryVisualization",
    components: {
      'apexchart': VueApexCharts,
      'trash-chart' : TrashHistoryChart,
      'comparison-chart' : TrashComparisonChart
    },
    data : () => ({
        loaded: false,
        initialize: [false, false, false, false],
        filterTrashesBy : ["DAY", "WEEK", "MONTH"],
    }),
    watch: {
        initialize(value) {
          console.log("changed")
          console.log(this.$data.initialize)
        }
    }
}
</script>