import Notification from "@/model/notification"
import trashApi from "@/services/trashesApi"
export default {
    state : {
        trashThrowed : []
    },
    getters : {
        isTrashThrowed : state => state.trashThrowed.length > 0,
        trashThrowed : state => state.trashThrowed
    },
    actions : {
        fetchTrashThrowed({commit, getters}) {
            return trashApi.getUserTrashes(getters.userProfile)
                .then(trashes => commit("setTrashesThrown", trashes))
        },
        SOCKET_newLevel({commit}, level) {
            commit("updateLevel", level)
        },
        SOCKET_newRewards({commit}, rewards) {
            var msg = new Notification("Nuovo premio sbloccato").setTo("/rewards")
            this.dispatch('msg/addMessage', msg)
            commit("addRewards", rewards)
        }  
    },
    mutations: {
        updateLevel(state, level) {
            state.userProfile.level = level
        },
        addRewards(state, rewards) {
            state.userProfile.rewards = state.userProfile.rewards.concat(rewards)
        },
        updateScore(state, {score, name}) {
            var updatedTrash = state.trashThrowed.find(trash => trash.trashCategory.name == name)
            updatedTrash.quantity ++
            state.userProfile.score += score
        },
        setTrashesThrown(state, trashes) {
            state.trashThrowed = trashes
        }
    }
}