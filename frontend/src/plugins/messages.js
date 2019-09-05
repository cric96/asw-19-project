/* A plugin for store and retrieve messages, like message bus
 * useful for local notification. 
 */
const messageModule = {
    namespaced: true,
    state: {
        queue: []
    },
    actions: {
        addMessage({commit}, payload) {
            commit('enqueueMessage', payload);
        },
        popMessage({state}) {
            if(state.queue.length > 0) {
                let popped = state.queue.shift();
                return popped;
            } else {
                return undefined;
            }
        },
    },
    mutations: {
        enqueueMessage(state, val) {
            state.queue.push(val);
        }
    }
};

const messageQueuePlugin = store => {
    store.registerModule('msg', messageModule);
}

export default messageQueuePlugin;