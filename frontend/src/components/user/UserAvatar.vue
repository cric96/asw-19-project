<template>
    <v-img v-if="isImageLoaded" :src="avatarImageUrl" class="elevation-2">
        <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="white"></v-progress-circular>
            </v-row>
        </template>
    </v-img>
    <div v-else>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name : "UserAvatar",
    props : {
        user : {
            type : Object
        }
    },
    computed: {
        isImageLoaded : function() {
            return this.user.avatarUrl !== undefined
        },
        avatarImageUrl : function() {
            return process.env.VUE_APP_NODE_SERVER + ""
                    + this.user.avatarUrl
        }
    }
}
</script>