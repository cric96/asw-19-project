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
const MEMBER = 0 //index in the trashAndUser data to select user informations
const TRASH = 1 //index in the trashAndUser data to select the trash thrown by the user
const FIRST = 0 //retrive first elements in the array

function createOptions(labels, colors) {
    return {
        chart: { //define here the chart style 
            stacked: true,
            toolbar: {
                show: false
            },
            zoom : false
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        },
        xaxis: {
            type: 'string',
            categories: labels, //put trash label passed
        },
        legend: {
            show: false
        },
        yaxis : {
            labels : {
                show : false
            }
        },
        colors : colors, //put the color passed
    }
}
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
        userAndTrashData: [],
    }),

    computed: {
        ...mapGetters(['activeBuilding']),
        
        loaded : function() {
            return this.userAndTrashData.length != 0
        },

        series : function() {
            if(!this.loaded) {
                return []
            }
            var seriesComputed = this.userAndTrashData[FIRST][TRASH].map(trash => {
                return {
                    name : trash.binCategory.name,
                    color : '#FFFFFF',
                    data : []
                }
            })
            this.userAndTrashData.forEach(element => {
                element[TRASH].forEach(trash => {
                    var total = trash.totalQuantity
                    seriesComputed.find(serie => serie.name == trash.binCategory.name).data.push(total)
                })
            })
            return seriesComputed
        },
        options : function() {
            if(!this.loaded) {
                return []
            }
            var labels = this.userAndTrashData.map(element => element[MEMBER].nickname)
            var colors = this.userAndTrashData[FIRST][TRASH].map(trash => {
                return trash.binCategory.colour
            })
            return createOptions(labels, colors)
        }
    },
    //improve performance here
    sockets: {
            newTrash(trash) {
                this.userAndTrashData
                    .filter(trashData => trashData[MEMBER]._id == trash.user)
                    .flatMap(trashData => trashData[TRASH])
                    .forEach(bin => {
                        bin.collectedTrashes.forEach(collectedTrash => {
                            if(trash.categoryName == collectedTrash.trashCategory.name) {
                                collectedTrash.quantity ++
                                bin.totalQuantity ++
                            }
                        })
                    })
            }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData : function() {
            binsApi.getBinsGroupByMember(this.activeBuilding)
                .then(userAndTrashes => this.userAndTrashData = userAndTrashes)
        }
    }
}
</script>