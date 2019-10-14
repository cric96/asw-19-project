/* eslint-disable no-empty-pattern */
import Vue from 'vue'
import Vuex from 'vuex'
import buildingModule from './module/building'
import authModule from './module/auth'
import trashCategoriesModule from './module/trashCategory'
import fb from '@/firebaseConfig.js'
import usersApi from '../services/usersApi'
import User from '@/model/user'
import messagesPlugin from '../plugins/messages'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [messagesPlugin],
    modules: {
        building: buildingModule,
        trashCategories : trashCategoriesModule,
        auth: authModule
    }
})

export default store
