<template >
    <v-list>
        <v-list-item>
            <v-list-item-avatar color="secondary">
                <span>{{user.level}}</span>
            </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>{{user.nickname}}</v-list-item-title>
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
            return `Score: ${this.user.score}`;
        }
    }
}
</script>