<template>
    <v-list app nav dense v-if="buildings.length > 0">
        <v-list-group prepend-icon="home" append-icon="mdi-menu-down" v-model="expanded">
            <template slot="activator" v-if="activeBuilding != null">
                <v-list-item-content>
                    <v-list-item-title>{{activeBuilding.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{activeBuilding.address}}</v-list-item-subtitle>
                </v-list-item-content>
            </template>

            <v-list-item-group :value="activeItem" mandatory>
                <template v-for="(building, i) in buildings">
                    <v-list-item :key="i" @click="selectBuilding(building)">
                        <template v-slot:default="{active}">
                            <v-list-item-content >
                                <v-list-item-title>{{building.name}}</v-list-item-title>
                                <v-list-item-subtitle>{{building.address}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-list-item>
                </template>
            </v-list-item-group>
            
            <v-list-item >
                <v-list-item-icon>
                    <v-icon>settings</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Manage Buildings</v-list-item-title>
                </v-list-item-content>
            </v-list-item>  
        </v-list-group>
    </v-list>
</template>


<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('building');

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
        activeItem() {
            return this.buildings.indexOf(this.activeBuilding);
        }
    },
    methods: {
        ...mapActions([
            'changeActiveBuildingId',
            'fetchBuildings'
        ]),
        init() {
            this.fetchBuildings();
        },
        selectBuilding(building) {
            this.expanded = false; /* trick for collpase the dropdown after selection */
            this.changeActiveBuildingId(building._id);
        }
    },
    mounted() {
        this.init();
    }
}
</script>