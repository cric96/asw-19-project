<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-autocomplete v-model="selectedMembers" :items="userItems" :search-input.sync="searchText" :loading="loading" 
                    clearable hide-details hide-selected
                    item-text="nickname"
                    item-value="nickname"
                    label="Membri dell'abitazione"
                    multiple chips deletable-chips return-object
                >
                    <template v-slot:no-data>
                        <v-list-item><v-list-item-title>Cerca e aggiungi<strong> membri</strong></v-list-item-title></v-list-item>
                    </template>
                    <!-- slot for selected items, show as chips -->
                    <template v-slot:selection="data" >
                        <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" 
                            @click:close="remove(data.item)">
                            <v-avatar left v-if="data.item.avatar"><v-img :src="data.item.avatar"/></v-avatar>
                            <v-avatar left v-else color="secondary" class="font-weight-light white--text">
                                {{data.item.nickname.charAt(0)}}
                            </v-avatar>
                            {{ data.item.nickname }}
                        </v-chip>
                    </template>
                    <!-- slot template for list of suggestions -->
                    <template v-slot:item="{ item }">
                        <v-list-item-avatar v-if="item.avatar"><v-img :src="item.avatar"/></v-list-item-avatar>
                        <v-list-item-avatar v-else color="secondary" class="headline font-weight-light white--text">
                            {{item.nickname.charAt(0)}}
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-if="item.nickname" v-text="item.nickname"></v-list-item-title>
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
export default {
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
            if(this.searchText && this.searchText.length > 0) {
                this.loading = true
                new Promise((resolve) => {
                    setTimeout(() => resolve(), 700);
                }).then(() => {
                    this.availableUsers = [{
                nickname: 'Andrea',
                email: 'petretiandrea@gmail.com'
                },
                {
                nickname: 'Mooon',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                email: 'petretiandrea@gmail.com'
                },
                {
                nickname: 'Maaaartttt',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                email: 'petretiandrea@gmail.com'
                },
                {
                nickname: 'Paggioliiix',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                email: 'petretiandrea@gmail.com'
                }] // TODO: replace this with remote fetch query
                    console.log(this.availableUsers)
                }).finally(() => {
                    this.loading = false
                });
            } else {
                this.availableUsers = []
                this.loading = false
            }
        }
    }
}
</script>