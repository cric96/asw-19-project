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
const { mapGetters } = createNamespacedHelpers('building');
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
        options: {
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
                categories: []
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
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    shade: 'light'
                }
            }
        },
        series: [{
            name: 'rifiuti',
            data: []
        }]
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
            return this.options.xaxis.categories.length != 0
        }
    },
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
            binsApi.getBins(this.activeBuilding, binsApi.filterBy[this.filterBy]())
                .then(trashes => {
                    this.options.xaxis.categories = trashes.map(trash => trash.binCategory.name)
                    this.options.colors = trashes.map(trash => trash.binCategory.colour)
                    this.series = [{
                        data : trashes.map(trash => trash.totalQuantity),     
                        name: 'rifiuti'
                    }]            
                })
        }
    }
}
</script>