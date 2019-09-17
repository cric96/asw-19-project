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
                                    <!--<autocomplete-address 
                                        v-model="autocompletedAddress"
                                        ></autocomplete-address>-->
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
                                    <v-autocomplete v-model="building.city"
                                        :items="cities.data"
                                        :loading="cities.loading"
                                        :search-input.sync="citySearchText"
                                        label="Seleziona la città" 
                                        hide-details hide-selected
                                        no-filter clearable return-object>
                                            <template v-slot:selection="data">
                                                <span>{{data.item.name}}, {{data.item.cap}}, {{data.item.state}}</span>
                                            </template>
                                            <template v-slot:item="{ item }">
                                                {{item.name}}, {{item.cap}}, {{item.state}}
                                            </template>
                                    </v-autocomplete>
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
                                        label="Interno"
                                        type="number"
                                        min="0"
                                        v-model="building.apartmentNumber"
                                        />
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
import { functions } from 'firebase'
import AutocompleteAddress from '@/components/AutocompleteAddress'

const { mapGetters, mapActions } = createNamespacedHelpers('building')

import MemberManager from '@/components/MemberManager'

export default {
    components: {
        'member-manager': MemberManager,
        'autocomplete-address': AutocompleteAddress
    },
    data: () => ({
        value: false,
        citySearchText: '',
        cities: {
            loading: false,
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
            let vm = this
            return {
                click: function(event) {
                    vm.value = !vm.value
                }
            }
        }
    },
    watch: {
        citySearchText(query) {
            query && !this.building.city && this.fetchCities(query)
        }
    },
    methods: {
         ...mapActions([
            'createBuilding' 
        ]),
        fetchCities(query) {
            this.cities.loading = true
            citiesApi.getAllFilter(query).then(data => {
                this.cities.data = data
            })
            .finally(() => this.cities.loading = false)
        },
        mapCityCap(event) {
            this.building.city = {
                cap: (event !== undefined) ? event.cap : undefined
            }
        },
        closeDialog() {
            this.value = false
        },
        pressSaveBuilding() {
            if (this.$refs.form.validate()) {
                let newBuilding = Object.assign({}, this.building)
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