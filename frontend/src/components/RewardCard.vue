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
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                    <v-btn
                            v-if="reward.video !== undefined" text :disabled="locked" 
                            @click="showVideo = !showVideo" v-on="on"
                    >
                        Video
                    </v-btn>
                </template>
                <div class="popup-style">
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Video</v-toolbar-title>
                    </v-toolbar>  
                    <iframe v-if="dialog" class="full-width-video" :src="reward.video"></iframe> 
                </div>
            </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const endRewardString = "per sbloccare questo premio"
function trashesToString(reward) {
    return reward.unlockData.categories.map(category => category.toLowerCase()).join(" o ")
}
export default {
    name: "RewardCard",
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
    }),
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

<style scoped>
.full-width-video{
  min-width: 100%;
  height: 92%;
}

.popup-style {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  height: 100%;
}

.pulsing {
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