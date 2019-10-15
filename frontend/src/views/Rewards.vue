<template>
    <v-container fluid grid-list-md :fill-height="loadingReward ? true : false">
        <v-layout v-if="loadingReward" row wrap align-center justify-center>
            <content-loader :loading="loadingReward"></content-loader>
        </v-layout>
        <v-layout v-else row wrap >
            <v-flex xs12 sm6 lg3 v-for="reward in unlocked(user)" v-bind:key="reward._id">
                <reward-card :reward="reward"/>
            </v-flex>
            <v-flex xs12 sm6 lg3 v-for="reward in locked(user)" v-bind:key="reward._id">
                <reward-card locked :reward="reward"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ScaleLoader } from '@saeris/vue-spinners'
import RewardCard from '@/components/RewardCard'
export default {
    components: {
        'content-loader': ScaleLoader,
        'reward-card' : RewardCard
    },
    computed: {
        ...mapGetters({
            'locked' : "reward/locked",
            'unlocked' : "reward/unlocked",
            'loaded' : "reward/loaded",
            'user' : "user/userProfile"
        }),
        loadingReward : function() {
            return !this.loaded
        }
    },
    methods : {
        ...mapActions('reward', [
            'fetchRewards'
        ])
    },
    mounted() {
        if(!this.loaded) {
            this.fetchRewards()
        }
    }
}
</script>