<template>
    <v-layout wrap>
        <v-col v-for="(bin, index) in bins" :key="index" cols="12" md="3" sm="6">
            <bin-card :bin="bin"></bin-card>
        </v-col>
    </v-layout>
</template>


<script>
import BinCard from '@/components/bin/BinCard'

export default {
    components: {
        'bin-card': BinCard
    },
    props: {
        bins: Array,
        loading: false
    },
    
}
</script>