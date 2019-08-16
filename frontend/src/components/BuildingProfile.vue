<template>
    <v-card>
        <v-list>
            <v-list-group prepend-icon="home" :value="expanded">
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="currentBuilding.name"/>
                        <v-list-item-subtitle v-text="currentBuilding.address"></v-list-item-subtitle>
                    </v-list-item-content>
                </template>

                <v-list-item v-for="(building, i) in availableBuilding" :key="i" link>
                    <v-list-item-content @click="selectBuilding(building)">
                        <active />
                        <v-list-item-title>{{building.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{building.address}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>   
            </v-list-group>
        </v-list>
    </v-card>
</template>


<script>
import { BuildingMock } from '../mock-helper/mockBuilding.js'

const EVENT_CURRENT_CHANGE = " onCurrentChange"

export default {
    name: 'BuldingProfileHeader',
    data: () => ({
        currentBuilding: { },
        availableBuilding: [],
        expanded: false
    }),
    methods: {
        init() {
            BuildingMock.getAll().then(result => {
                this.currentBuilding = result[0];
                this.availableBuilding = result;
            });
            
        },
        emitEventOnChangeCurrent(current) {
            this.$emit(EVENT_CURRENT_CHANGE, current);
        },
        selectBuilding(building) {
            this.currentBuilding = building;
            this.expanded = false;
        }
    },
    mounted() {
        this.init();
    }
}
</script>