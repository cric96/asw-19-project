<template>
    <v-list app nav dense v-if="buildings.length > 0">
        <v-list-group prepend-icon="home" append-icon="mdi-menu-down" v-model="expanded">
            <template slot="activator" v-if="activeBuilding != null">
                <v-list-item-content>
                    <v-list-item-title>{{activeBuilding.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{activeBuilding.address}}</v-list-item-subtitle>
                </v-list-item-content>
            </template>

            <v-list-item-group :value="activeBuildingIndex" mandatory>
                <template v-for="building in buildings">
                    <v-list-item :key="building._id" @click="selectBuilding(building)">
                        <template v-slot:default="{active}">
                            <v-list-item-content >
                                <v-list-item-title>{{building.name}}</v-list-item-title>
                                <v-list-item-subtitle>{{building.address}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-list-item>
                </template>
            </v-list-item-group> 
        </v-list-group>
    </v-list>
</template>


<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('building')

export default {
    name: 'NavBuildingSelector',
    data: () => ({
        expanded: false
    }),
    computed: {
        ...mapGetters([
            'activeBuilding',
            'buildings'
        ]),
        activeBuildingIndex() {
            return this.buildings.findIndex(building => building._id == this.activeBuilding._id)
        }
    },
    methods: {
        ...mapActions([
            'changeActiveBuilding',
            'fetchBuildings'
        ]),
        init() {
            this.fetchBuildings()
        },
        selectBuilding(building) {
            this.changeActiveBuilding(building._id)
            //TODO inviare richiesta per joinarsi alla room del building
            this.expanded = false /* trick for collpase the dropdown after selection */
        }
    },
    mounted() {
        this.init()
    }
}
</script>