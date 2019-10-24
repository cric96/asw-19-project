import Notification from "@/model/notification"
import trashApi from "@/services/trashesApi"
/**
 * add functionality to user store at the moment
 */
export default {
    state : {
        //save all trash throwed by the logged user
        trashThrown : [],
    },
    getters : {
        trashThrown : state => state.trashThrown
    },
    actions : {
        //retrive trash throweb by logged user
        fetchTrashThrown({commit, getters}) {
            return trashApi.getUserTrashes(getters.userProfile)
                .then(trashes => commit("setTrashesThrown", trashes))
        },
        //reaction at the newLevel message sent by server via web socket
        SOCKET_newLevel({commit}, level) {
            commit("updateLevel", level)
        },
        //reaction at the newRewards message sent by server via web socket
        SOCKET_newRewards({commit}, rewards) {
            var msg = new Notification("Nuovo premio sbloccato").setTo("/rewards")
            this.dispatch('msg/addMessage', msg) //show notification
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
            var updatedTrash = state.trashThrown.find(trash => trash.trashCategory.name == name)
            if(updatedTrash) { //if the trash thrwon was fetched
                //TODO think how manage the trash thrown by user
                updatedTrash.quantity ++
            }
            state.userProfile.score += score
        },
        setTrashesThrown(state, trashes) {
            state.trashThrown = trashes
        }
    }
}