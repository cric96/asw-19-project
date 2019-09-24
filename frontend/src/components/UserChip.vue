<template>
    <v-menu :disabled="!expandable" v-model="menu" transition="scale-transition">
        <template v-slot:activator="{ on }">
            <v-chip v-bind="$attrs" v-on="wrapChipListeners(on)" >
                <v-avatar left v-if="user.avatar"><v-img :src="user.avatar"/></v-avatar>
                <v-avatar left v-else color="secondary" class="font-weight-light white--text">
                    {{ user | formatUserDisplayName | initial }}
                </v-avatar>
                {{ user | formatUserDisplayName }}
            </v-chip>
            <slot></slot>
        </template>
        <v-card width="400" v-if="expandable">
            <v-list>
              <v-list-item>
                    <v-list-item-avatar left v-if="user.avatar"><v-img :src="user.avatar"/></v-list-item-avatar>
                    <v-list-item-avatar left v-else color="secondary" class="font-weight-light white--text">
                        {{ user | formatUserDisplayName | initial }}
                    </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{ user | formatUserDisplayName }}</v-list-item-title>
                    <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon @click="menu = false">
                        <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script>
import User from '@/model/user'

export default {
    name: 'UserChip',
    props: {
        user: {
            type: User,
            default: function() {
                return new User()
            }
        },
        expandable: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        menu: false
    }),
    methods: {
        wrapChipListeners: function(internalListeners){
            // inerith parent listeners, but preserver the internal listeners
            if(this.expandable) {
                return Object.assign({}, this.$listeners, internalListeners)
            }
            return this.$listeners
        }
    }
}
</script>