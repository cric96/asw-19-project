<template>
    <v-container fluid>
        <v-card>
            <v-tabs
                center-active
                centered
                background-color="secondary lighten-1"
            >
                <v-tab>Per Livello</v-tab>
                <v-tab>Per Punteggio</v-tab>
                <v-tab>Per Rifiuto</v-tab>
               
                <v-tab-item>
                    <level-and-score :isLevelRank="true"/>
                </v-tab-item>
                <v-tab-item>
                    <level-and-score :isLevelRank="false"/>
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
    }
}
</script>

<style scoped>
.v-list-item:hover:before, .v-list-item:focus:before {
  color : rgba(1,1,1,0)
}

</style>