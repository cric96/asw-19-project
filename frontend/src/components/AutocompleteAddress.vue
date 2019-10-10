<template>
    <v-autocomplete 
        v-model="selectedAddress" 
        :items="availableAddresses"
        :search-input.sync="searchText"
        :loading="loading"
        no-filter clearable hide-details
        item-text="label"
        item-value="locationId"
        :rules="rules"
        required
        return-object>

        <template v-slot:no-data>
            <v-list-item><v-list-item-title>Nessun indirizzo trovato</v-list-item-title></v-list-item>
        </template>

    </v-autocomplete>
</template>


<script>
import hereService from '@/services/hereApi'

export default {
    props: {
        value: {
            type: Object,
            default: function() { return null; }
        },
        /*matchLevel: {
            type: String,
            validator: (val) => ['houseNumber', 'intersection', 'street', 'postalCode', 'district', 'city', 'county', 'state', 'country'].includes(val),
            required: true
        }*/
    },
    data: function() {
        return {
            selectedAddress: null,
            fetchedAddresses: [],
            searchText: null,
            loading: false,
            rules: [v => (!!v && (v.matchLevel === "street" || v.matchLevel == "houseNumber")) || "Questo campo è obbligatorio"]
        }
    },
    watch: {
        searchText(query) {
            if(query && query.length > 0) {
                this.loading = true
                hereService.findSuggestions(query).then(results => {
                    this.fetchedAddresses = results.suggestions
                }).catch(err => {
                }).finally(() => {
                    this.loading = false
                })
            } else { 
                this.loading = false
                this.fetchedAddresses = []
            }
        },
        selectedAddress(addressSelected) {
            if(addressSelected && (addressSelected.matchLevel === "street" || addressSelected.matchLevel == "houseNumber")) {
                this.$emit('input', addressSelected.address)
            } else {
                this.$emit('input', null)
            }
        }
    },
    computed: {
        availableAddresses: function() {
            return this.fetchedAddresses
        },
        map: function(item) {
            return item.label
        }
    }
}
</script>