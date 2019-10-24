import rewardsApi from '@/services/rewardsApi'
/**
 * manage reward information retrived by user and from web socker messages
 */
export default {
    namespaced: true,
    state: {
        rewards: [], //all rewards store into the database
        rewardsNotification : [] //new rewards unlocked by used
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
        /**
         * remove a reward notification after seeing it
         * @param {*} id the reward id
         */
        resetNotification({commit}, id) {
            commit("removeNotification", id)
        },
        /**
         * reaction after a new reward unlock by an user
         */
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