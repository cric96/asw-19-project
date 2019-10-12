<template>
    <v-layout>
        <h1> Premi </h1>
        <v-layout v-if="loadingReward" row wrap align-center justify-center>
            <content-loader :loading="loadingReward"></content-loader>
        </v-layout>
        <v-layout v-else row wrap align-center justify-center>
            <h2> Sbloccati</h2>
                <v-flex>
                    <ul>
                        <li v-for="reward in unlocked(user)" v-bind:key="reward._id">
                            {{ reward.name }}
                        </li>
                    </ul>
                </v-flex>
                
            <h2> Da sbloccare </h2>
                <v-flex>
                    <ul>
                        <li v-for="reward in locked(user)" v-bind:key="reward._id">
                            {{ reward.name }}
                        </li>
                    </ul>
                </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ScaleLoader } from '@saeris/vue-spinners'

export default {
    components: {
        'content-loader': ScaleLoader,
    },
    computed: {
        ...mapGetters({
            'locked' : "reward/locked",
            'unlocked' : "reward/unlocked",
            'loaded' : "reward/loaded",
            'user' : "auth/userProfile"
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
        //if(!this.loaded) {
            this.fetchRewards()
        //}
    }
}
</script>