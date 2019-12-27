<template>
    <!-- TODO: ? fullscreen hide-overlay -->
    <div>
        <slot name="activator" v-bind:on="activatorListener"></slot>
        <v-dialog v-model="value" persistent transition="dialog-bottom-transition" max-width="600px">
            <v-card>
                <v-card-title class="roboto-s secondary white--text" >
                    Add new building
                </v-card-title>
                <v-alert class="mt-3 mx-3" text v-if="alert" :type="alert.type">{{ alert.message }}</v-alert>
                <v-card-text>
                    <v-container>
                        <v-form ref="form" lazy-validation>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field name="name" 
                                        label="Building name" 
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
                                        label="Choose a city" 
                                        hide-details hide-selected
                                        no-filter clearable return-object>
                                            <template v-slot:no-data>
                                                <v-list-item>
                                                    <v-list-item-title>
                                                    Search for your
                                                    <strong>city</strong>
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
                                        label="Building address" 
                                        :rules="baseRule"
                                        v-model="building.address"
                                        required/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field 
                                        name="floor" 
                                        label="Building floor" 
                                        type="number"
                                        v-model="building.floor"/>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field 
                                        name="apartmentNumber" 
                                        label="Building apartment number"
                                        type="number"
                                        min="0"
                                        v-model="building.apartmentNumber"
                                        />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <autocomplete-managers v-model="building.members" :filter="filterExcludeOwner"></autocomplete-managers>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="primary" text :disabled="pendingOperation" @click="value = false">Close</v-btn>
                    <v-btn color="primary" text :loading="pendingOperation" @click="pressSaveBuilding">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import citiesApi from '@/services/citiesApi'
import AutocompletMembers from '@/components/AutocompleteMembers'
import Notification from "@/model/notification"


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
        baseRule: [v => !!v || "This field is mandatory"]
    }),
    computed: {
        activatorListener: function() {
            let vm = this
            return {
                click: function(event) {
                    vm.value = !vm.value
                }
            }
        },
        ...mapGetters({
            currentUser: 'user/userProfile'
        })
    },
    watch: {
        citySearchText(query) {
            query && !this.building.city && this.fetchCities(query)
        }
    },
    methods: {
         ...mapActions('building', [
            'createBuilding'
        ]),
        filterExcludeOwner(member) {
          return member.firebase_uid != this.currentUser.firebase_uid
        },
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
                newBuilding.owner = this.currentUser
                newBuilding.members = (this.building.members) ? this.building.members.map(member => member.firebase_uid) : []
                let promise = this.createBuilding(newBuilding).then(() => {
                    this.$refs.form.reset()
                    this.closeDialog()
                    this.$store.dispatch('msg/addMessage', new Notification('New building created'))
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