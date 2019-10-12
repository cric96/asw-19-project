import rewardsApi from '@/services/rewardsApi'
//TODO riguarda qua, verifica che effettivamente sia reattivo ai cambiamenti, 
//altrimenti devi cambiare struttura
export default {
    namespaced: true,
    state: {
        rewards: []
    },
    getters: {
        locked : state => user => {
            return state.rewards.filter(reward => ! user.rewards.find(userReward => reward._id == userReward))
        },
        unlocked : state => user => {
            return state.rewards.filter(reward => user.rewards.find(userReward => reward._id == userReward))
        },
        loaded : state => state.rewards.length != 0 
    },
    actions: {
        fetchRewards({ commit }) {
            return rewardsApi.getRewards()
                .then(rewards => commit('setRewards', rewards))
                .catch(error => console.log(error)) //todo find a way to manage error
        },
    },
    mutations: {
        setRewards(state, rewards) {
            state.rewards = rewards
        }
    }
};