<template>
    <v-card height="390px" fill-height>
        <v-list-item class="secondary text--white">
            <v-list-item-avatar >
                <v-badge>
                    <bin-svg :height="40" :color="bin.binCategory.colour"/>
                </v-badge>
            </v-list-item-avatar>
            <v-list-item-content class="ml-n4">
                <v-list-item-title class="white--text roboto-xs">    
                    {{bin.binCategory.name}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
            <div style="height:255px;" 
                        class="card-font center-element"
                         v-if="bin.totalQuantity != 0">
                <apexchart height=250px width=250px :options="options" :series="series"></apexchart>
            </div>
            <div style="height:255px;
                        margin: 0 auto;  
                        display: flex;
                        align-items: center;
                        justify-content: center;" 
                        class="card-font center-element " v-else>
            No trash <v-icon size=34 class="ml-2">sentiment_dissatisfied</v-icon> 
            </div>
        
        <v-divider class="mb-4"/>
        <v-card-actions>
            <v-spacer></v-spacer>
            <p class="roboto-m">Total: <span class="font-weight-bold">{{collectedTotal}}</span></p> <!-- or font-weight-thin? -->
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>

</template>

<style scoped>
#hidden_mask {
    display: none;
}
.canvas {
    max-width: 100%;
    height: auto;
}
.card-font {
    font-family: "Roboto" !important;
    font-size: 0.9em !important;
    letter-spacing: 1.5 !important;
    text-transform: uppercase !important;
}
.total-font {
    font-family: "Roboto" !important;
    font-size: 1.2em !important;
    letter-spacing: 1.5 !important;
    text-transform: uppercase !important;
}
.center-element {
    margin: 0 auto;  
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<script>

import VueApexCharts from 'vue-apexcharts'
import Bin from '@/model/bin'
import DynamicBin from '@/components/bin/DynamicBin'
import FlippingCard from '@/components/FlippingCard'
import BinSvg from '@/components/bin/BinSvg'
export default {
    name: 'BinCard',
    props: {
        bin: {
            type: Object,
            required: true
        }
    },
    components: {
        'flip-card': FlippingCard,
        'dynamic-bin': DynamicBin,
        'apexchart': VueApexCharts,
        'bin-svg' : BinSvg
    },
    data:() => ({
        show: false,
        flip: false
    }),
    computed: {
        collectedTotal() {
            return this.bin.totalQuantity
        },
        series() {
            return this.bin.collectedTrashes.map(collectedTrash => collectedTrash.quantity)
        },
        options() {
            let labels = this.bin.collectedTrashes.map(collectedTrash => collectedTrash.trashCategory.name)
            return createChartOptions(this.bin.collectedTrashes)
        }
    }
}

function createChartOptions(trashes) {
    return {
        chart: {
            width: '100%',
            type: 'pie'
        },
        legend: {
            show: false,
            showForSingleSeries: false,
            position: 'bottom'
        },
        labels: trashes.map(collectedTrash => collectedTrash.trashCategory.name),
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return trashes[opts.seriesIndex].trashCategory.name
            },
            style: {
                colors: ['#000000']
            }
        },
        tooltip: {
            theme: "light"
        },
        colors : ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c"]
    }
}

</script>

<style scoped>
.apexcharts-tooltip {
    color: black
}
</style>