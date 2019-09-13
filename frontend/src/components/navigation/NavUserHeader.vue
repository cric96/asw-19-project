<template >
    <v-list v-if="user">
        <v-list-item>
            <v-list-item-avatar color="secondary" class="headline font-weight-light white--text">
               {{user.level}}
            </v-list-item-avatar>
            <div class="my-2" justify-end>
                <v-btn color="primary" rounded icon outlined x-small @click="$emit('clickUser')">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
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