<template>
    <!-- details -->
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <v-btn
                color="primary" text @click="onInfoClick" v-on="on"
            >
                <template v-if="locked">
                    Requirements
                </template>
                <template v-else>
                    Details
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
</template>

<script>
import { mapGetters } from 'vuex'
const endRewardString = "to unlock this reward"
function trashesToString(reward) {
    return reward.unlockData.categories.map(category => category.toLowerCase()).join(" o ")
}
export default {
    name : "RewardDetails",
    props : {
        reward : {
            type : Object
        },
        locked : {
            type : Boolean
        },
        onClick : {
            type : Function
        }
    },
    data : () => ({
        showMoreInfo : false
    }),
    computed: {
        ...mapGetters({
            'user' : 'user/userProfile',
            'trashThrown' : 'user/trashThrown'
        })
    },
    methods: {
        onInfoClick : function() {
            this.showMoreInfo = !this.showMoreInfo
            this.onClick()
        },
        totalTrash : function() {
            return this.trashThrown.reduce((acc, trash) => acc + trash.quantity, 0)
        },
        trashFromCategories : function() {
            //find a way to generalize (put in store?)
            var data = this.reward.unlockData
            var trashThrownByCategories = this.trashThrown.filter(trash => {
                return trash.trashCategory.name.includes(...data.categories)
            })
            return trashThrownByCategories.reduce((acc, trash) => {
                return acc + trash.quantity
            }, 0)
        },
        howToUnlock(reward) {
            switch(reward.unlockData.type) {
                case 'genericTrash':
                    return `you have to recycle ${reward.unlockData.quantity} 
                        trashes ${endRewardString}, you're at ${this.totalTrash()}`
                case 'trash':
                    return `you have to recycle ${reward.unlockData.quantity} 
                             ${trashesToString(reward)} trashes ${endRewardString}, you're at ${this.trashFromCategories()}`
                case 'score':
                    return `get ${reward.unlockData.score} scores ${endRewardString}, you're at ${this.user.score}` 
                case 'level':
                    return `reach level ${reward.unlockData.level} to ${endRewardString}, you're at ${this.user.level}`
            }
        }
    }
}
</script>