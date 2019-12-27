<template>
  <v-autocomplete :value="value" @input="$emit('input', $event)"
    :items="autocompleteItems"
    :search-input.sync="searchText"
    :loading="loading"
    :disabled="disabled"
    label="Building members"
    item-text="email"
    clearable
    hide-details hide-selected no-filter
    multiple
    chips
    deletable-chips
    return-object
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Find and add 
          <strong>members</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <!-- slot for selected items, show as chips -->
    <template v-slot:selection="data">
      <user-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" @click:close="remove(data.item)" 
          :user="data.item">
      </user-chip>
    </template>
    <!-- slot template for list of suggestions -->
    <template v-slot:item="{ item }">
      
        <v-list-item-avatar
          color="secondary"
          class="headline font-weight-light white--text"
        >
        <user-avatar :user="item">
          {{ item | formatUserDisplayName | initial }}
        </user-avatar>
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
</template>

<script>
import userApi from "@/services/usersApi"
import UserChip from "@/components/user/UserChip"
import UserAvatar from "@/components/user/UserAvatar"

export default {
  components: {
    "user-chip": UserChip,
    "user-avatar" : UserAvatar
  },
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    filter: Function,
    disabled: Boolean
  },
  data: () => ({
    availableUsers: [],
    searchText: null,
    loading: false
  }),
  computed: {
    autocompleteItems: function() {
      let notFilteredUsers = this.availableUsers.concat(this.value)
      return this.filter ? notFilteredUsers.filter(this.filter) : notFilteredUsers
    }
  },
  methods: {
    remove(item) {
      const index = this.value.findIndex(member => member.email == item.email)
      if (index >= 0) this.value.splice(index, 1)
    },
    fetchUsers(filterQuery) {
      this.loading = true
      userApi.getAllUsers(filterQuery)
        .then(results => this.availableUsers = results)
        .finally(() => this.loading = false)
    }
  },
  watch: {
    searchText(query) {
      query && query.length > 0 && this.fetchUsers(query)
    }
  }
};
</script>