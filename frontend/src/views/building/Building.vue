<template>
    <v-container fluid>
        <building-dialog-form>
            <template v-slot:activator="{on}">
                <v-btn fab bottom right fixed direction="top" v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </building-dialog-form>

        <v-expansion-panels>
            <template v-for="building in buildings">
                <v-expansion-panel :key="building._id">
                    <v-expansion-panel-header v-slot="{ open }">
                        <v-list-item avatar>
                            <v-list-item-avatar>
                                <v-icon centered>home</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{building.name}}</v-list-item-title>
                                <v-list-item-subtitle>{{building.address}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-expansion-panel-header>
                </v-expansion-panel>
            </template>
        </v-expansion-panels>
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