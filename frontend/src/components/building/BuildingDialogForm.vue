<template>
    <!-- TODO: ? fullscreen hide-overlay -->
    <div>
        <slot name="activator" v-bind:on="activatorListener"></slot>
        <v-dialog v-model="value" persistent transition="dialog-bottom-transition" max-width="600px">
            <v-card>
                <v-alert v-if="alert" :type="alert.type">{{ alert.message }}</v-alert>
                <v-card-title>
                    <span class="headline"> Aggiungi nuova abitazione</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form" v-model="validForm" lazy-validation>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field name="name" 
                                        label="Nome abitazione" 
                                        :rules="baseRule"
                                        v-model="building.name"
                                        required/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        name="address" 
                                        label="Indirizzo abitazione" 
                                        :rules="baseRule"
                                        v-model="building.address"
                                        required/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select :value="building.city" @input="mapCityLink($event)" 
                                        :items="cities.data"
                                        :loading="cities.loading"
                                        label="Seleziona la città" 
                                        clearable return-object>
                                            <template v-slot:selection="{item, index}">
                                                <span>{{item.name}}, {{item.country}}</span>
                                            </template>
                                            <template slot="item" slot-scope="data">
                                                {{data.item.name}}, {{data.item.country}}
                                            </template>
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field 
                                        name="floor" 
                                        label="Piano abitazione" 
                                        type="number"
                                        v-model="building.floor"/>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field 
                                        name="apartmentNumber" 
                                        label="Numero Civico"
                                        type="number"
                                        min="0"
                                        :rules="baseRule"
                                        v-model="building.apartmentNumber"
                                        required/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <member-manager></member-manager>
                            </v-row>
                        </v-form>
                        <!-- TODO: preview google maps -->
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="value = false">Chiudi</v-btn>
                    <v-btn color="blue darken-1" text :loading="pendingOperation" @click="pressSaveBuilding">Salva</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import citiesApi from '@/services/cities.api'
import { functions } from 'firebase';
const { mapGetters, mapActions } = createNamespacedHelpers('building');

import MemberManager from '@/components/MemberManager'

export default {
    mounted() {
        this.initialize()
    },
    components: {
        'member-manager': MemberManager
    },
    data: () => ({
        value: false,
        cities: {
            loading: true,
            data: []
        },
        validForm: true,
        building: { },
        members: [],
        alert: null,
        pendingOperation: false,
        baseRule: [v => !!v || "Questo campo è obbligatorio"]
    }),
    computed: {
        activatorListener: function() {
            let vm = this;
            return Object.assign({}, {
                click: function(event) {
                    vm.value = !vm.value;
                }
            });
        }
    },
    methods: {
         ...mapActions([
            'createBuilding' 
        ]),
        initialize() {
            this.cities.loading = true
            citiesApi.getAll().then(data => {
                this.cities.data = data
            }).finally(() => this.cities.loading = false)
        },
        mapCityLink(event) {
            this.building.city = (event !== undefined) ? event.link : undefined
        },
        closeDialog() {
            this.value = false
        },
        pressSaveBuilding() {
            if (this.$refs.form.validate()) {
                let newBuilding = Object.assign({}, this.building);
                let promise = this.createBuilding(newBuilding).then(() => {
                    this.$refs.form.reset()
                    this.closeDialog()
                    this.$store.dispatch('msg/addMessage', 'Nuova abitazione creata')
                }).catch(err => {
                    this.alert = { type: 'error', message: err }
                })
                this.handleLoading(promise)
            }
        },
        handleLoading(promise) {
            this.pendingOperation = true
            promise.finally(() => this.pendingOperation = false)
        }
    }
}
</script>