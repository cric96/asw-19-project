<template>
    <v-snackbar v-model="notificationShow">
        {{notificationText}}
        <v-btn text color="primary" @click.native="notificationShow = false">Chiudi</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    data: () => ({
        notificationShow: false,
        notificationText: ""
    }),
    computed: {
        notifications() {
            return this.$store.state.msg.queue
        },
        hasNotification() {
            return this.notifications.length > 0
        }
    },
    watch: {
        notifications(newVal) {
            this.$store.dispatch('msg/popMessage').then(nextMessage => {
                if(nextMessage !== undefined) {
                    this.notificationText = nextMessage
                    this.notificationShow = true
                }  
            })
        },
        notificationShow() {
            if(this.notificationShow && this.hasNotification) {
                this.$store.dispatch('msg/popMessage').then(nextMessage => {
                    if(nextMessage !== undefined) {
                        this.notificationText = nextMessage
                        /* For show all snackbar, nextTick is called after snackbar disappear */
                        this.$nextTick(() => this.notificationShow = true)
                    }  
                })
            }
        }
    }
}
</script>