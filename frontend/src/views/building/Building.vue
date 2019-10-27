<template>
    <v-layout>

        <building-dialog-form v-if="!buildingsIsLoading" ref="createDialog">
            <template v-slot:activator="{on}">
                <v-btn fab bottom right fixed direction="top" v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </building-dialog-form>

        <!-- Content loader -->
        <v-layout v-if="buildingsIsLoading" row wrap align-center justify-center>
            <loader></loader>
        </v-layout>

        <v-layout v-else-if="!buildingsIsLoading && buildings.length > 0">
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

        <empty-view v-else class="full-vh align-center">
            <template slot="title">Ops! Nessuna abitazione.</template>
            <template slot="message">
                Crea una nuova abitazione <v-btn depressed fab disabled x-small><v-icon small>add</v-icon></v-btn> 
                per iniziare subito a... bla bla bla bla bla bla
            </template>
            <template slot="actions">
                <v-btn @click="$refs.createDialog.value = true" text color="orange" outlined>Crea abitazione</v-btn>
            </template>
        </empty-view>
    </v-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import BuildingDialogFrom from '@/components/building/BuildingDialogForm'
import BuildingCard from '@/components/building/BuildingCard'
import EmptyView from '@/components/EmptyView'
import Loader from '@/components/Loader'

const { mapGetters, mapActions } = createNamespacedHelpers('building');

export default {
    name: 'Building',
    components: {
        'loader': Loader,
        'building-dialog-form': BuildingDialogFrom,
        'building-card': BuildingCard,
        'empty-view': EmptyView
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