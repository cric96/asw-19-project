<template>
    <v-card
        class="mx-auto " v-bind:class="{ pulsing: newReward, lockStyle : locked }"
    >
        <v-list-item :class="(locked ? '' : 'secondary text--white')">
            <v-list-item-avatar >
                <v-badge>
                    <v-icon v-if="locked" color="white">lock</v-icon>
                    <v-icon color="white" v-else>lock_open</v-icon>
                </v-badge>
            </v-list-item-avatar>
            <v-list-item-content class="ml-n4">
               <v-list-item-title class="roboto-xs white--text">    
                    {{reward.name}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-img
            class="mt-2"
            :src="reward.picture" heigth="200"
        ></v-img>
        <v-card-text>
            <v-row>
                <reward-progress
                    :reward="reward"/>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <reward-details
                :reward="reward"
                :locked="locked"
                :onClick="onDetailsClick"
            />
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
import RewardDetails from '@/components/reward/RewardDetails'
import RewardProgress from '@/components/reward/RewardProgress'
import ResizeText from 'vue-resize-text'
export default {
    name: "RewardCard",
    directives: {
        ResizeText
    },
    components: {
        "youtube-video" : YoutubeVideoPopup,
        "reward-details" : RewardDetails,
        "reward-progress" : RewardProgress
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
    computed: {
        ...mapGetters({
            'rewardsNotification' : "reward/rewardsNotification"
        }),
        newReward : function() {
            return this.rewardsNotification(this.reward._id)
        }  
    },
    methods: {
        ...mapActions({
            "resetNotification" : "reward/resetNotification"
        }),
        openVideo : function() {
            if(this.newReward) {
                this.resetNotification(this.reward._id)
            }
            this.$refs.youtube.open()
        },
        onDetailsClick : function() {
            if(this.newReward) {
                this.resetNotification(this.reward._id)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.pulsing {
    box-shadow: 0 0 0 rgba(204,169,44, 0.4);
    animation: pulse 1s infinite;
}
.lockStyle {
    background-color: lightgray;
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