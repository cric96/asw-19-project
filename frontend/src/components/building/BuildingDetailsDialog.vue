<template>
    <v-row justify-center>
        <v-dialog :value="value" @input="$emit('input', $event)" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="$emit('input', false)" :disabled="pendingOperation">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ editable ? "Gestisci abitazione" : "Info abitazione"}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items v-if="editable">
                        <v-btn dark text @click="save" :loading="pendingOperation">
                            <v-icon left small>fas fa-save</v-icon>Salva
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container>
                    <!-- Alert error -->
                    <alert ref="alert" v-model="showAlert"></alert>

                    <!-- Building fields section -->
                    <v-card elevation="0">
                        <v-card-title>
                            <div class="overline font-weight-medium">Info abitazione</div>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="form" lazy-validation>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field name="name" 
                                            label="Nome abitazione" 
                                            v-model="updatedBuilding.name"
                                            :rules="buildingNameRule"
                                            :disabled="pendingOperation"
                                            :readonly="!editable"
                                            required/>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field name="city" 
                                            label="Citta"
                                            :value="formattedCity"
                                            readonly/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field 
                                            name="address" 
                                            label="Indirizzo abitazione"
                                            :value="updatedBuilding.address"
                                            readonly/>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-text-field 
                                            name="floor" 
                                            label="Piano abitazione" 
                                            type="number"
                                            :value="updatedBuilding.floor"
                                            readonly/>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-text-field 
                                            name="apartmentNumber" 
                                            label="Interno"
                                            type="number"
                                            min="0"
                                            :value="updatedBuilding.apartmentNumber"
                                            readonly/>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                    
                    <!-- Members section -->
                    <v-card elevation="0">
                        <v-card-title><div class="overline font-weight-medium">Membri</div></v-card-title>
                        <v-card-text>
                            <v-row v-if="editable"> 
                                <v-col cols="11">
                                    <autocomplete-members v-model="membersAutoComplete"
                                        :filter="excludeBuildingMembers" :disabled="pendingOperation"></autocomplete-members>
                                </v-col>
                                <v-col cols="1" class="d-flex justify-center align-end">
                                    <v-btn fab elevation="1" small color="primary"
                                        @click="addMembers(membersAutoComplete)" :disabled="pendingOperation">
                                        <v-icon small>fas fa-user-plus</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-list two-line :disabled="pendingOperation">
                                <template v-for="(member, index) in currentMembersList"> 
                                    <v-list-item :key="member._id">
                                        <v-list-item-avatar color="secondary" class="font-weight-light white--text">
                                                <user-avatar :user="member">
                                                    {{ member | formatUserDisplayName | initial }}
                                                </user-avatar>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>{{ member | formatUserDisplayName }}</v-list-item-title>
                                            <v-list-item-subtitle>{{ member.email }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn v-if="member._id != updatedBuilding.owner._id && editable" 
                                                @click="removeMember(member)" x-small icon>
                                                <v-icon>mdi-close-circle</v-icon>
                                            </v-btn>
                                            <v-chip v-if="member._id == updatedBuilding.owner._id">Proprietario</v-chip>
                                        </v-list-item-action>
                                    </v-list-item>
                                    <v-divider v-if="index + 1 < currentMembersList.length" :key="index"></v-divider>
                                </template>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import AlertMessageComponent from '@/components/AlertMessageComponent'
import AutocompleteMembers from '@/components/AutocompleteMembers'
import UserAvatar from '@/components/user/UserAvatar'
import Notification from "@/model/notification"
import { building as buildingError } from '@/resource/errors.js'
import { mapActions } from 'vuex'

export default {
    components: {
        'alert': AlertMessageComponent,
        'autocomplete-members': AutocompleteMembers,
        'user-avatar': UserAvatar
    },
    data: () => ({
        membersAutoComplete: [],
        updatedBuilding: {},
        pendingOperation: false,
        showAlert: false,
        buildingNameRule: [v => !!v && v.trim() != "" || "Nome non valido"]
    }),
    props: {
        value: {
            type: Boolean,
            required: true
        },
        building: {
            type: Object,
            required: true,
            default: function() { return undefined }
        },
        editable: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        building: {
            immediate: true,
            handler: function(buildingChanged) {
                this.updatedBuilding = Object.assign({}, buildingChanged)
            }
        },
        // need to watch when dialog become visible for create a local copy
        // of the building for prevent props editing.
        value(isDialogVisible) {
            if(isDialogVisible) {
                this.updatedBuilding = Object.assign({}, this.building)
            }
        }
    },
    computed: {
        currentMembersList() {
            return this.updatedBuilding.members
        },
        formattedCity() {
            return this.updatedBuilding.city.name + ", " + this.updatedBuilding.city.cap + ", " + this.updatedBuilding.city.state
        }
    },
    methods: {
        ...mapActions('building', [
           'updateBuilding' 
        ]),
        addMembers(newMembers) {
            this.updatedBuilding.members = this.updatedBuilding.members.concat(newMembers)
            this.membersAutoComplete = []
        },
        removeMember(memberToRemove) {
            this.updatedBuilding.members = this.updatedBuilding.members.filter(member => member._id != memberToRemove._id)
        },
        excludeBuildingMembers(member) {
            return !this.currentMembersList.find(current => current._id == member._id) 
        },
        save() {
            this.showAlert = false
            if(this.$refs.form.validate()) {
                this.pendingOperation = true
                this.updateBuilding(this.updatedBuilding).then(updatedBuilding => {
                    // close the dialog
                    this.$emit('input', false)
                    // show snackbar success
                    this.$store.dispatch('msg/addMessage', new Notification("Abitazione aggiornata"))
                })
                .catch(err => {
                    this.showAlert = true
                    this.$refs.alert.showError(buildingError.editError(err.code))
                })
                .finally(() => {
                    this.pendingOperation = false
                })
            }
        }
    }
}
</script>