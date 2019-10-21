/* eslint-disable no-empty-pattern */
import Vue from 'vue'
import Vuex from 'vuex'
import buildingModule from './module/building'
import userModule from './module/user'
import trashCategoriesModule from './module/trashCategory'
import rewardModule from './module/reward'
import messagesPlugin from '../plugins/messages'
Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [messagesPlugin],
    modules: {
        building: buildingModule,
        trashCategories : trashCategoriesModule,
        user: userModule,
        reward : rewardModule
    }
})
store.emitOnSocket = function(type, payload) {
    this._vm.$socket.emit(type, payload)
}
export default store