<template>
    <v-col cols="12">
        <v-progress-linear
            :value="progress"
            height="15"
            striped
            rounded
        ></v-progress-linear>
    </v-col>

</template>

<script>
import { mapGetters } from 'vuex'
const MAX = "100"
export default {
    name : "RewardProgress",
    props : {
        reward : {
            type : Object
        }
    },
    computed : {
        progress : function() {
            var data = this.reward.unlockData
            switch(data.type) {
                case "score" : 
                case "level" :
                    return this.progressForBasicProps(data.type)
                case "genericTrash" :
                    return this.progressTrashThrown()
                case "trash" :
                    return this.progressTrashThrownByCategory()
            }
        },
        ...mapGetters({
            'user' : 'user/userProfile',
            'trashThrown' : 'user/trashThrown'
        })
    },
    methods : {
        progressForBasicProps(propName) {
            var data = this.reward.unlockData
            if(this.user[propName] > data[propName]) {
                return MAX
            }
            return (this.user[propName] / data[propName]) * 100
        },
        progressTrashThrown() {
            var data = this.reward.unlockData
            var trashThrownQuantity = this.trashThrown.reduce((acc, trash) => acc + trash.quantity, 0)
            if(trashThrownQuantity > data.quantity) {
                return "100"
            }
            return (trashThrownQuantity / data.quantity) * 100
        },
        progressTrashThrownByCategory() {
            var data = this.reward.unlockData
            var trashThrownByCategories = this.trashThrown.filter(trash => {
                return trash.trashCategory.name.includes(...data.categories)
            })
            var trashThrownQuantity = trashThrownByCategories.reduce((acc, trash) => {
                return acc + trash.quantity
            }, 0)
            if(trashThrownQuantity > data.quantity) {
                return "100"
            }
            return (trashThrownQuantity / data.quantity) * 100
        }
    }
}
</script>
