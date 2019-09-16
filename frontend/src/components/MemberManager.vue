<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-autocomplete v-model="selectedMembers" :items="userItems" :search-input.sync="searchText" :loading="loading" 
                    clearable hide-details hide-selected no-filter
                    label="Membri dell'abitazione"
                    multiple chips deletable-chips return-object
                >
                    <template v-slot:no-data>
                        <v-list-item><v-list-item-title>Cerca e aggiungi<strong> membri</strong></v-list-item-title></v-list-item>
                    </template>
                    <!-- slot for selected items, show as chips -->
                    <template v-slot:selection="data" >
                        <user-chip v-bind="data.attrs" :input-value="data.selected" :user="data.item" close @click="data.select" 
                            @click:close="remove(data.item)"></user-chip>
                    </template>
                    <!-- slot template for list of suggestions -->
                    <template v-slot:item="{ item }">
                        <v-list-item-avatar v-if="item.avatar"><v-img :src="item.avatar"/></v-list-item-avatar>
                        <v-list-item-avatar v-else color="secondary" class="headline font-weight-light white--text">
                            {{ item | formatUserDisplayName | initial }}
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-if="item">{{item | formatUserDisplayName}}</v-list-item-title>
                            <v-list-item-subtitle v-text="item.email"></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon>fas fa-user-friends</v-icon>
                        </v-list-item-action>
                    </template>
                </v-autocomplete>
            </v-col>
        </v-row>
        <v-row>

        </v-row>
    </v-container>
</template>

<script>
import userApi from '@/services/users.api'
import UserChip from '@/components/UserChip'

export default {
    components: {
        'user-chip': UserChip
    },
    data: () => ({
        selectedMembers: [],
        availableUsers: [],
        searchText: null,
        loading: false
      }),
      computed: {
        userItems: function() {
            return this.availableUsers.concat(this.selectedMembers)
        }
    },
    methods: {
        searchable: item => this.nickname || `${this.name} ${this.surname}` || this.email,
        remove (item) {
            const index = this.selectedMembers.indexOf(item)
            if (index >= 0) this.selectedMembers.splice(index, 1)
        },
    },
    watch: {
        searchText(val) {
            if(val && val.length > 0) {
                this.loading = true
                userApi.getAllUsers(val).then(results => {
                    this.availableUsers = results
                }).finally(() => {
                    this.loading = false
                })
            } else {
                this.availableUsers = []
                this.loading = false
            }
        }
    }
}
</script>