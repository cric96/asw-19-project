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
                            <v-row v-if="cityEnabled">
                                <v-col cols="12">
                                    <v-text-field name="city" label="Città"></v-text-field>
                                </v-col>
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
const { mapGetters, mapActions } = createNamespacedHelpers('building');

export default {
    data: () => ({
        value: false,
        cityEnabled: false,
        validForm: true,
        building: { },
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
        pressSaveBuilding() {
            if (this.$refs.form.validate()) {
                let newBuilding = Object.assign({}, this.building);
                this.pendingOperation = true;
                this.createBuilding(newBuilding).then(() => {
                    this.$refs.form.reset();
                    this.value = false;
                }).catch(err => {
                    this.alert = {
                        type: 'error',
                        message: err
                    }
                }).finally(() => {
                    this.pendingOperation = false;
                });
            }
        }
    }
}
</script>