<template>
    <v-navigation-drawer v-bind:value.sync="value" @input="val => $emit('input', val)" app clipped>
        <!-- Header navigation drawer -->
        <template v-slot:prepend>
            <nav-user-header/>
        </template>
        <v-divider/>
        <!-- Main content navigation drawer -->
        <nav-building-selector/>
        <v-divider/>
        <v-list app nav dense>
            <v-list-item v-for="item in navItems" :key="item.title" :to="item.path" exact>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>
        </v-list>

        <!-- Footer navigation drawer -->
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block @click="logout">Logout</v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import NavUserHeader from '@/components/navigation/NavUserHeader'
import NavBuildingSelector from '@/components/navigation/NavBuildingSelector'

export default {
    name: 'NavigationDrawer',
    components: {
        'nav-user-header': NavUserHeader,
        'nav-building-selector': NavBuildingSelector
    },
    methods: {
        logout : function(){
            this.$store.dispatch('logout')
        }
    },
    props: {
        value: {
            type: Boolean,
            default: null
        },
        navItems: {
            type: Array,
            required: true
        }
    }
}
</script>