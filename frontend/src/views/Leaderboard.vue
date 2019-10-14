<template>
    <v-container fluid>
        <v-card >
            <v-tabs
                center-active
                centered
            >
                <v-tab>Per Livello</v-tab>
                <v-tab>Per Punteggio</v-tab>
                <v-tab>Per Rifiuto</v-tab>
               
                <v-tab-item>
                    <level-and-score/>
                </v-tab-item>
                <v-tab-item>
                    <level-and-score/>
                </v-tab-item>
               <v-tab-item>
                    <trash/>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>
<script>
import ranksApi from '@/services/ranksApi'
import LevelAndScoreRank from '@/components/rank/LevelAndScoreRank'
import TrashRank from '@/components/rank/TrashRank'
export default {
    data: () => ({
        elements : []
    }),
    components : {
        'level-and-score' : LevelAndScoreRank,
        'trash' : TrashRank
    },
    mounted() {
        ranksApi.getRank().then(rank => this.$data.elements = rank)
    }
}
</script>

<style scoped>
.v-list-item:hover:before, .v-list-item:focus:before {
  color : rgba(1,1,1,0)
}

</style>