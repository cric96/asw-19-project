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
                {{textFromFilter}}
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
function createOptions(labels, colors) {
    return {
        chart: {
            id: 'rifiuti',
            toolbar: {
                show: false,
            },  
        },
        xaxis: {
            labels : {
                show : false
            },
            categories: labels
        },
        yaxis : {
            labels : {
                show : false
            }
        },
        plotOptions : {
            bar: {
                distributed: true
            }
        },
        colors : colors,
        fill: {
            opacity: 1,
            type: 'gradient',
            gradient: {
                shade: 'light'
            }
        }
    }
}
export default {
    name : "TrashHistoryChart",
    components : {
      'apexchart': VueApexCharts,
    },
    props : {
        filterBy : {
            type : String
        },
        height : {
            type : Number
        }
    },
    data : () => ({
        trashData : []
    }),
    computed: {
        ...mapGetters(['activeBuilding']),
        textFromFilter : function(){
            switch(this.filterBy) {
                case 'DAY':
                    return "Rifiuti delle ultime 24 ore"
                case 'WEEK':
                    return "Rifiuti dell'ultima settimana"
                case 'MONTH':
                    return "Rifiuti dell'ultimo mese"
            }
        }, 
        loaded : function() {
            return this.trashData.length != 0
        },
        series : function() {
            var data = this.trashData.map(trash => trash.totalQuantity)
            return [{
                data : data,     
                name: 'rifiuti'
            }]          
        },
        options : function() {
            var labels = this.trashData.map(trash => trash.binCategory.name)
            var colors = this.trashData.map(trash => trash.binCategory.colour)
            return createOptions(labels, colors)
        }
    },
    sockets: {
        newTrash(trash) {
            this.trashData.forEach(bin => {
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
            binsApi.getBins(this.activeBuilding, binsApi.filterBy[this.filterBy]())
                .then(trashes => this.trashData = trashes)
        }
    }
}
</script>