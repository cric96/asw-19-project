<template >
    <v-list v-if="user">
        <v-list-item>
            <div class="d-flex flex-row full-width">
                <v-list-item-avatar color="secondary" class="headline font-weight-light white--text">
                    {{user.level}}
                </v-list-item-avatar>
                <v-spacer></v-spacer>
                <div class="my-2" >
                    <v-btn text rounded icon outlined x-small @click="$emit('clickEditUser')">
                        <v-icon x-small>fas fa-user-cog</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>{{ user | formatUserDisplayName }}</v-list-item-title>
                <v-list-item-subtitle>{{score}} <!-- add an icon for "trash point" or similar --></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <!-- default slot for add other contents to user header -->
        <slot></slot>
    </v-list>
</template>

<style scoped>
.full-width {
    width: 100%;
}
</style>

<script>
import User from '@/model/user'
export default {
    name: 'NavUserHeader',
    props: {
        user: {
            type: User, 
            required: true
        }
    },
    computed: {
        score() {
            return `Score: ${this.user.score}`
        }
    }
}
</script>