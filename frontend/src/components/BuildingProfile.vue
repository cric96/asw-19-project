<template>
    <v-list nav>
        <v-list-group prepend-icon="home" v-model="expanded">
            <template slot="activator">
                <v-list-item-content>
                    <v-list-item-title v-text="currentBuilding.name"/>
                    <v-list-item-subtitle v-text="currentBuilding.address"></v-list-item-subtitle>
                </v-list-item-content>
            </template>

            <v-list-item v-for="(building, i) in availableBuilding" :key="i" link>
                <v-list-item-content @click="selectBuilding(building)">
                    <v-list-item-title>{{building.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{building.address}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>   
        </v-list-group>
    </v-list>
</template>


<script>
import { BuildingMock } from '../mock-helper/mockBuilding.js'

export const events = {
    onCurrentChange: 'onCurrentChange'
};

export default {
    name: 'BuldingProfileHeader',
    data: () => ({
        currentBuilding: { },
        availableBuilding: [],
        expanded: false
    }),
    props: {
        
    },
    methods: {
        init() {
            BuildingMock.getAll().then(result => {
                this.currentBuilding = result[0];
                this.availableBuilding = result;
            });
            
        },
        emitEventOnChangeCurrent(current) {
            this.$emit(events.onCurrentChange, current);
        },
        selectBuilding(building) {
            this.currentBuilding = building;
            this.expanded = false; /* trick for collpase the dropdown after selection */
            this.emitEventOnChangeCurrent(building);
        }
    },
    mounted() {
        this.init();
    }
}
</script>