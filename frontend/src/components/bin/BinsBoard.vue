<template>
    <v-layout wrap>
        <content-loader justify="center" v-if="loading" :loading="loading"></content-loader>
        <v-col v-else v-for="(bin, index) in bins" :key="index" cols="12" md="3" sm="6">
            <bin-card :bin="bin" hover="true"></bin-card>
        </v-col>
    </v-layout>
</template>


<script>
import BinCard from '@/components/bin/BinCard'
import { ScaleLoader } from '@saeris/vue-spinners'

export default {
    components: {
        'bin-card': BinCard,
        'content-loader': ScaleLoader
    },
    props: {
        bins: Array,
        loading: false
    },
    
}
</script>