<template>
    <!-- details -->
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <v-btn
                color="primary" text @click="onInfoClick" v-on="on"
            >
                <template v-if="locked">
                    Requisiti
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
</template>

<script>
import { mapGetters } from 'vuex'
const endRewardString = "per sbloccare questo premio"
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
                    return `devi buttare ${reward.unlockData.quantity} 
                            rifiuti ${endRewardString}, ne hai buttati ${this.totalTrash()}`
                case 'trash':
                    return `devi buttare ${reward.unlockData.quantity} 
                            rifiuti di ${trashesToString(reward)} ${endRewardString}, ne hai buttati ${this.trashFromCategories()}`
                case 'score':
                    return `devi raggiungere ${reward.unlockData.score} punti ${endRewardString}, ne hai guadagnati ${this.user.score}` 
                case 'level':
                    return `devi raggiungere il livello ${reward.unlockData.level} per ${endRewardString}, ora sei al livello ${this.user.level}`
            }
        }
    }
}
</script>