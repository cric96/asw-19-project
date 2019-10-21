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
                        <v-form ref="form" lazy-validation>
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
                                    <v-autocomplete v-model="building.city"
                                        :items="cities.data"
                                        :loading="cities.loading"
                                        :search-input.sync="citySearchText"
                                        :rules="baseRule"
                                        label="Seleziona la città" 
                                        hide-details hide-selected
                                        no-filter clearable return-object>
                                            <template v-slot:no-data>
                                                <v-list-item>
                                                    <v-list-item-title>
                                                    Cerca la tua
                                                    <strong>città</strong>
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </template>
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
                                <v-col cols="6" md="6">
                                    <v-text-field 
                                        name="floor" 
                                        label="Piano abitazione" 
                                        type="number"
                                        v-model="building.floor"/>
                                </v-col>
                                <v-col cols="6" md="6">
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
                                <v-col cols="12">
                                    <autocomplete-managers v-model="building.members"></autocomplete-managers>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text :disabled="pendingOperation" @click="value = false">Chiudi</v-btn>
                    <v-btn color="blue darken-1" text :loading="pendingOperation" @click="pressSaveBuilding">Salva</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import citiesApi from '@/services/citiesApi'
import AutocompletMembers from '@/components/AutocompleteMembers'

const { mapGetters, mapActions } = createNamespacedHelpers('building')


export default {
    components: {
        'autocomplete-managers': AutocompletMembers
    },
    data: () => ({
        value: false,
        citySearchText: '',
        cities: {
            loading: false,
            data: []
        },
        building: { },
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
                newBuilding.members = (this.building.members) ? this.building.members.map(member => member.firebase_uid) : []
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