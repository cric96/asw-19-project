<template >
    <v-list v-if="user">
        <v-list-item v-if="user">
            <div class="d-flex flex-row full-width" >
                <v-list-item-avatar size=60>
                    <v-img v-if="isImageLoaded" :src="user.avatarUrl">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="primary lighten-1"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                    <v-img v-else src="@/assets/no-user-pic.png"/>
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
import {mapGetters} from 'vuex'
export default {
    name: 'NavUserHeader',
    data : () =>({
        defaultUrl : "http://localhost:8080/img/no-user-pic.389f6639.png"
    }),
    computed : {
        ...mapGetters ({
            'user' : 'user/userProfile'
        }),
        isImageLoaded : function() {
            console.log(this.user.avatarImageUrl)
            return this.user.avatarUrl !== undefined
        },
        avatarImageUrl : function() {
            console.log(this.user)
            return this.user.avatarUrl
        }

    }
}
</script>