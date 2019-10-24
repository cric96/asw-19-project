<template>
    <v-layout>

        <!-- Content loader -->
        <v-layout v-if="buildingsIsLoading" row wrap align-center justify-center>
            <loader></loader>
        </v-layout>

        <v-layout v-else>
            <building-dialog-form>
                <template v-slot:activator="{on}">
                    <v-btn fab bottom right fixed direction="top" v-on="on">
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>
            </building-dialog-form>

            <v-container grid-list-md fluid>
                <v-layout wrap>
                    <template v-for="building in buildings">
                        <v-flex :key="building._id" xs12 sm6 md4 lg4 xl3>
                            <building-card :building="building"></building-card>
                        </v-flex>
                    </template>
                </v-layout>
            </v-container>
        </v-layout>
    </v-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import BuildingDialogFrom from '@/components/building/BuildingDialogForm'
import BuildingCard from '@/components/building/BuildingCard'
import Loader from '@/components/Loader'

const { mapGetters, mapActions } = createNamespacedHelpers('building');

export default {
    name: 'Building',
    components: {
        'loader': Loader,
        'building-dialog-form': BuildingDialogFrom,
        'building-card': BuildingCard
    },
    computed: {
        ...mapGetters([
            'buildingsIsLoading',
            'activeBuilding',
            'buildings'
        ]),
    }
}
</script>