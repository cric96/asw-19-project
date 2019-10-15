import rewardsApi from '@/services/rewardsApi'
//TODO riguarda qua, verifica che effettivamente sia reattivo ai cambiamenti, 
//altrimenti devi cambiare struttura
export default {
    namespaced: true,
    state: {
        rewards: [],
        rewardsNotification : []
    },
    getters: {
        locked : state => user => {
            return state.rewards.filter(reward => ! user.rewards.find(userReward => reward._id == userReward))
        },
        unlocked : state => user => {
            return state.rewards.filter(reward => user.rewards.find(userReward => reward._id == userReward))
        },
        loaded : state => state.rewards.length != 0,
        rewardsNotification : state => id => state.rewardsNotification.find(reward => reward == id)
    },
    actions: {
        fetchRewards({ commit }) {
            return rewardsApi.getRewards()
                .then(rewards => commit('setRewards', rewards))
                .catch(error => console.log(error)) //todo find a way to manage error
        },
        resetNotification({commit}, id) {
            commit("removeNotification", id)
        },
        SOCKET_newRewards({commit}, rewards) {
            commit("addNotications", rewards)
        }        
    },
    mutations: {
        setRewards(state, rewards) {
            state.rewards = rewards
        },
        addNotications(state, newRewards) {
            state.rewardsNotification = state.rewardsNotification.concat(newRewards);
        },
        removeNotification(state, id) {
            state.rewardsNotification = state.rewardsNotification.filter(reward => reward!== id)
        }
    }
};