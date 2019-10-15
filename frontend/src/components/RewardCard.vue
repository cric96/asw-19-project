<template>
    <v-card
        class="mx-auto" :dark="locked" v-bind:class="{ pulsing: newReward }"
    >
        <v-list-item>
            <v-list-item-avatar >
                <v-badge>
                    <template v-slot:badge v-if="newReward">!</template>
                    <v-icon v-if="locked">lock</v-icon>
                    <v-icon v-else>lock_open</v-icon>
                </v-badge>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">
                    {{reward.name}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-img
            :src="reward.picture" heigth="200"
        ></v-img>
        <v-card-actions>
            <!-- details -->
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary" text @click="onInfoClick" v-on="on"
                    >
                        <template v-if="locked">
                            Come sbloccare
                        </template>
                        <template v-else>
                            Dettagli
                        </template>
                        <v-icon>{{ showMoreInfo ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-if="locked">
                        {{ howToUnlock(reward) }}
                    </v-list-item>
                    <v-list-item v-else>
                        {{ reward.description }}
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-spacer/>
            
            <!-- video -->
            <template v-if="reward.video !== undefined">
                <v-btn
                    v-if="reward.video !== undefined" text :disabled="locked" 
                    @click="openVideo"
                >
                Video
                </v-btn>
                <youtube-video ref="youtube" :video="reward.video"/>
            </template>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import YoutubeVideoPopup from '@/components/YoutubeVideoPopup'

const endRewardString = "per sbloccare questo premio"
function trashesToString(reward) {
    return reward.unlockData.categories.map(category => category.toLowerCase()).join(" o ")
}
export default {
    name: "RewardCard",
    components: {
        "youtube-video" : YoutubeVideoPopup
    },
    props: {
       reward: {
        type: Object,
        required: true
      },
      locked : {
          type : Boolean,
          default: false
      }
    },
    data : () => ({
        showMoreInfo : false,
        showVideo : false,
        dialog : false,
        videoLoading : false
    }),
    computed: {
        ...mapGetters({
            'rewardsNotification' : "reward/rewardsNotification"
        }),
        newReward : function() {
            return this.rewardsNotification(this.reward._id)
        }  
    },
    watch : {
        /**
         * when show video changes, i must attach a callback on video
         * to verify when it is loaded
         */
        showVideo(newVal) {
            if(newVal) {
                //i use next tick because the video must be rendered the next frame
                this.$nextTick(() => {
                    this.$refs.youtubeVideo.onload = () => {
                        this.$data.videoLoading = true
                    }
                })
            }
        }
    },
    methods: {
        ...mapActions({
            "resetNotification" : "reward/resetNotification"
        }),
        openVideo : function() {
            this.$refs.youtube.open()
        },
        onInfoClick : function() {
            this.showMoreInfo = !this.showMoreInfo
            if(this.newReward) {
                this.resetNotification(this.reward._id)
            }
        },
        howToUnlock(reward) {
            switch(reward.unlockData.type) {
                case 'genericTrash':
                    return `devi buttare ${reward.unlockData.quantity} rifiuti ${endRewardString}`
                    break;
                case 'trash':
                    return `devi buttare ${reward.unlockData.quantity}  rifiuti di ${trashesToString(reward)} ${endRewardString}`
                    break;
                case 'score':
                    return `devi raggiungere ${reward.unlockData.score} punti ${endRewardString}`
                    break;
                case 'level':
                    return `devi raggiungere il livello ${reward.unlockData.level} per ${endRewardString}`
                    break;
            }
        }
    }
}
</script>

<style scoped lang="scss">
pulsing {
    box-shadow: 0 0 0 rgba(204,169,44, 0.4);
    animation: pulse 1s infinite;
}
@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      -webkit-box-shadow: 0 0 0 5px rgba(204,169,44, 1);
  }
  100% {
      -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
    box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 5px rgba(204,169,44, 1);
      box-shadow: 0 0 0 5px rgba(204,169,44, 1);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
      box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
}
</style>