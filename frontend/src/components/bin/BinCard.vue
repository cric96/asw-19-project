<template>
    <flip-card v-model="flip" fill-height mouseover>
        <template slot="front">
            <!-- Definition of FRONT card -->
            <v-card fill-height>
                <v-card-title primary-title two-line>{{bin.binCategory.name}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 200px;">
                    <v-layout row wrap justify-center>
                        <dynamic-bin :bin="bin"></dynamic-bin>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <h6 class="ml-2 headline font-weight-light">Totale: {{collectedTotal}}</h6> <!-- or font-weight-thin? -->
                    <v-spacer></v-spacer>
                    <v-btn icon @click="flip = !flip"><v-icon small>fas fa-sync-alt</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </template>
        <template slot="back">
            <!-- Definition of BACK card -->
            <v-card>
                <v-card-title primary-title two-line>{{bin.binCategory.name}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 200px;">
                    <v-layout row wrap justify-center>
                        <apexchart :options="options" :series="series"></apexchart>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="flip = !flip"><v-icon small>fas fa-sync-alt</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </flip-card>
</template>

<style scoped>
#hidden_mask {
    display: none;
}
.canvas {
    max-width: 100%;
    height: auto;
}
</style>

<script>

import VueApexCharts from 'vue-apexcharts'
import Bin from '@/model/bin'
import DynamicBin from '@/components/bin/DynamicBin'
import FlippingCard from '@/components/FlippingCard'

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
        'apexchart': VueApexCharts
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
            return createChartOptions(labels)
        }
    }
}

function createChartOptions(labels) {
    return {
        chart: {
            width: '100%',
            type: 'donut'
        },
        legend: {
            show: false,
            showForSingleSeries: false,
            position: 'bottom'
        },
        labels: labels
    }
}

</script>