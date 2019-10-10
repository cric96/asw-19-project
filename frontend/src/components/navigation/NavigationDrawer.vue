<template>
    <v-navigation-drawer v-bind:value.sync="value" @input="val => $emit('input', val)" app clipped>
        <!-- Header navigation drawer -->
        <template v-slot:prepend>
            <nav-user-header v-if="userProfile" :user="userObject" @clickEditUser="clickUser"/>
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
import { mapGetters } from 'vuex'
import User from '@/model/user'


export default {
    name: 'NavigationDrawer',
    components: {
        'nav-user-header': NavUserHeader,
        'nav-building-selector': NavBuildingSelector
    },
    methods: {
        clickUser() {
            this.$router.replace("/userProfile")
        },
        logout : function(){
            this.$store.dispatch('auth/logout').then(() => {
                this.$router.replace("/intro")
            })
        }
    },
    computed: {
        ...mapGetters('auth', [
            'userProfile'
        ]),
        userObject: function() {
            return User.fromJson(this.userProfile)
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