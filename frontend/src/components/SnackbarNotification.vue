<template>
    <v-snackbar v-model="notificationShow"
                :timeout="1500">
        {{notification.text}}
        <v-btn v-if="hasLink" :to="notification.to" text> Vedi </v-btn>
        <v-btn text color="primary" @click.native="notificationShow = false">Chiudi</v-btn>
    </v-snackbar>
</template>

<script>
import Notification from "@/model/notification"
const emptyMsg = Notification.empty
/**
 * this component show message store in the msq queue.
 * the message must me have the text property.
 * if you want to redirect you must specify to with the link of the page.
 * you can create the message with Notification class:
 * 
 * var msg = new Notification("notification").to("/link")
 * 
 */
export default {
    data: () => ({
        notificationShow: false, //tell if there is a notification to show or not
        notification: emptyMsg, //the text of the notification
        localQueue: [] //the local notification queue
    }),
    computed: {
        notifications() {
            //based on vuex stored, take messagge and considered it as notificaton
            return this.$store.state.msg.queue
        },
        hasNotificationsStored() {
            //verify if there is some notifications stored
            return this.localQueue.length > 0
        },
        hasLink() {
            return this.notification.to 
        }
    },
    watch: {
        notifications(newVal) {
            this.$store.dispatch('msg/popMessage').then(nextMessage => {
                //put the new notification in the snackbar.
                if(this.notification.text === "" && nextMessage) {
                    this.notification = nextMessage
                    this.notificationShow = true
                //if there is already a notification, store message into a queue
                } else if(nextMessage){
                    console.log(nextMessage)
                    this.localQueue.push(nextMessage)
                }
            })
        },
        notificationShow() { //verify what to do when the notificationShow changes,
            /*
            if the previous notication is hidden and there is some notification stored,
            show the first notification stored and remove it from the queue
            */
            if(!this.notificationShow && this.hasNotificationsStored) {
                this.notification = this.localQueue[0]
                this.localQueue.shift()
                this.$nextTick(() => this.notificationShow = true)
            /*
                if there isn't notification on queue, hide notification.
            */
            } else if(!this.notificationShow) {
                this.notification = emptyMsg
            }
        }
    }
}
</script>