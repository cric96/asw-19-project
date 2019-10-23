<template>
    <!--
        reward section selectionable in application navigation bar.
    -->
    <v-container fluid grid-list-md :fill-height="loadingReward ? true : false">
        <!-- loader -->
        <v-layout v-if="loadingReward" row wrap align-center justify-center>
            <content-loader></content-loader>
        </v-layout>
        <!-- reward grid -->
        <v-layout v-else row wrap >
            <!-- rewards unlocked -->
            <v-flex xs12 sm6 lg3 v-for="reward in unlocked(user)" v-bind:key="reward._id">
                <reward-card :reward="reward"/>
            </v-flex>
            <!-- rewards locked -->
            <v-flex xs12 sm6 lg3 v-for="reward in locked(user)" v-bind:key="reward._id">
                <reward-card locked :reward="reward"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loader from '@/components/Loader'
import RewardCard from '@/components/RewardCard'
export default {
    components: {
        'content-loader': Loader,
        'reward-card' : RewardCard
    },
    computed: {
        ...mapGetters({
            'locked' : "reward/locked",
            'unlocked' : "reward/unlocked",
            'loaded' : "reward/loaded",
            'user' : "user/userProfile"
        }),
        //verify if the reward array is not already fetched
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
        //at beginning, verify if the reward's array is fetched
        if(!this.loaded) {
            this.fetchRewards()
        }
    }
}
</script>