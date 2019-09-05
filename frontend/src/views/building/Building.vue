<template>
    <v-container fluid>
        <building-dialog-form>
            <template v-slot:activator="{on}">
                <v-btn fab bottom right fixed direction="top" v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </building-dialog-form>

        <v-list two-line>
            <template v-for="building in buildings">
                <v-list-tile avatar :key="building._id">
                    <v-list-tile-avatar>
                        <img src="src">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{building.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{building.address}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import BuildingDialogFrom from '@/components/building/BuildingDialogForm'

const { mapGetters, mapActions } = createNamespacedHelpers('building');

export default {
    name: 'Building',
    components: {
        'building-dialog-form': BuildingDialogFrom
    },
    computed: {
        ...mapGetters([
            'activeBuilding',
            'buildings'
        ]),
    }
}
</script>