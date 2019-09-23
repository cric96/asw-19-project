<template>
    <v-layout wrap>
        <content-loader justify="center" v-if="loading" :loading="loading"></content-loader>
        <v-col v-else v-for="(bin, index) in bins" :key="index" cols="12" md="6" sm="6">
            <dynamic-bin :bin="bin"></dynamic-bin>
        </v-col>
    </v-layout>
</template>


<script>
import DynamicBin from '@/components/bin/DynamicBin'
import { ScaleLoader } from '@saeris/vue-spinners'

export default {
    components: {
        'dynamic-bin': DynamicBin,
        'content-loader': ScaleLoader
    },
    props: {
        bins: Array,
        loading: false
    },
    
}
</script>