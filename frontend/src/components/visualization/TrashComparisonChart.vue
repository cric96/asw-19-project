<template>
    <v-skeleton-loader
        class="mx-auto"
        :loading="!loaded"
        transition='scale-transition'
        :height="height"
        type="card"
    >
        <v-card
            class="mx-auto text-center"
            :height="height"
        >
            <v-card-title>
                Comparazione rifiuti
            </v-card-title>
            <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                <div>
                    <!-- do better -->
                    <apexchart type="bar" height=180px :options="options" :series="series"></apexchart>
                </div>
                </v-sheet>
            </v-card-text>
        </v-card>
    </v-skeleton-loader>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'
import binsApi from '@/services/binsApi'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('building')
const MEMBER = 0
const TRASH = 1
const FIRST = 0
export default {
    name : "TrashComparisonChart",
    components : {
      'apexchart': VueApexCharts,
    },
    props : {
        height : {
            type : Number
        }
    },
    data: () => ({
        series: [] ,
        options: {
          chart: {
            stacked: true,
            toolbar: {
              show: false
            },
            zoom : false
          },
          
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false
            },
            colors : {
                backgroundBarColors: ["#F00FFF"]
            }
          },

          xaxis: {
            type: 'string',
            categories: [],
          },
          legend: {
              show: false
          },
          yaxis : {
                labels : {
                    show : false
                }
          },
          fill: {
            opacity: 1,
            type: 'gradient',
            gradient: {
                shade: 'light'
            }
          }
        }
      }),
    computed: {
        ...mapGetters(['activeBuilding']),
        
        loaded : function() {
            return this.series.length != 0
        }
    },
    //improve performance here
    sockets: {
            newTrash(trash) {
                this.fetchData()
            }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData : function() {
            binsApi.getBinsGroupByMember(this.activeBuilding)
                .then(userAndTrashes => {
                    this.options.xaxis.categories = userAndTrashes.map(element => element[MEMBER].nickname)              
                    var seriesComputed = userAndTrashes[FIRST][TRASH].map(trash => {
                        return {
                            name : trash.binCategory.name,
                            color : '#FFFFFF',
                            data : []
                        }
                    })
                    this.options.colors = userAndTrashes[FIRST][TRASH].map(trash => {
                        return trash.binCategory.colour
                    })
                    userAndTrashes.map(element => {
                        element[TRASH].map(trash => {
                            var total = trash.totalQuantity
                            seriesComputed.find(serie => serie.name == trash.binCategory.name).data.push(total)
                        })
                    })
                    this.series = seriesComputed
                })
        }
    }
}
</script>