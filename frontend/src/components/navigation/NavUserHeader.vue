<template >
    <v-list v-if="user">
        <v-list-item v-if="user">
            <div class="d-flex flex-row full-width" >
                <v-list-item-avatar size=60 class="ml-n2">
                    <user-photo ref="photoLoader"/>
                    <v-img v-if="isImageLoaded" :src="avatarImageUrl" class="elevation-2">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="primary lighten-1"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                    <v-img v-else src="@/assets/no-user-pic.png" />
                    <v-badge color="primary" class="mt-12 ml-n4">
                        <template v-slot:badge>
                            <v-icon x-small dark @click="onEdit">edit</v-icon>
                        </template>
                    </v-badge>
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
import UserPhotoInsertion from '@/components/UserPhotoInsertion'
import {mapGetters} from 'vuex'
export default {
    name: 'NavUserHeader',
    components: {
        'user-photo' : UserPhotoInsertion
    },
    computed : {
        ...mapGetters ({
            'user' : 'user/userProfile'
        }),
        isImageLoaded : function() {
            return this.user.avatarUrl !== undefined
        },
        avatarImageUrl : function() {
            return process.env.VUE_APP_NODE_SERVER + ""
                    + this.user.avatarUrl
        }
    },
    methods : {
        onEdit: function() {
            console.log("on edit..")
            this.$refs.photoLoader.open()
        }
    }
}
</script>