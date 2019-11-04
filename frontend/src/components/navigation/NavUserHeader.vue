<template >
    <v-list v-if="user">
        <v-list-item v-if="user">
            <div class="d-flex flex-row full-width" >
                <v-list-item-avatar size=60>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png" />
                </v-list-item-avatar>
                <v-spacer></v-spacer>
                <div class="my-2" >
                    <v-btn class="elevation-0" fab dark x-small color="secondary" @click="$emit('clickEditUser')">
                        <v-icon dark x-small>fas fa-user-cog</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="headline">{{ user | formatUserDisplayName }}</v-list-item-title>
                <v-list-item-subtitle class="overline font-weight-bold">Punteggio: {{ user.score }}</v-list-item-subtitle>
                <v-list-item-subtitle class="overline font-weight-bold">Livello: {{ user.level }}</v-list-item-subtitle>
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
    }
}
</script>