<template >
    <v-list>
        <v-list-item>
            <v-list-item-avatar color="secondary">
                <span>{{user.level}}</span>
            </v-list-item-avatar>
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
export default {
    name: 'UserHeader',
    props: {
        user: {
            type: Object, 
            //required: true,
            default() { // TODO: remove it when the user's model is defined
                return {
                    nickname: 'pedrolon',
                    email: 'petretiandrea@gmail.com',
                    score: 3560,
                    level: 30
                };
            }
            /* TODO: when the user's model is defined, insted of Object put the constructor
             * Example: function User (firstName, lastName, ...) { ... }
             * user : { type: User, required: true }
             * this validate the value of props -> https://vuejs.org/v2/guide/components-props.html#Type-Checks */
        }
    },
    computed: {
        score() {
            return `Score: ${this.user.score}`;
        }
    },
    mounted() {

    }
}
</script>