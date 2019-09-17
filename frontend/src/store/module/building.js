// import { ApiBuilding } from '@/services/mockApiBuilding'
import ApiBuilding from '@/services/buildings.api'
import * as types from '../mutationTypes'
import store from '../store';
import { stat } from 'fs';

const ACTIVE_BUILDING_KEY = 'activeBuilding' 

function getDefaultActiveBuilding(state) {
    if((state.activeBuilding == null && state.availableBuildings.length > 0) ||
        !state.availableBuildings.map(building => building._id).includes(state.activeBuilding)) {
        return state.availableBuildings[0]._id
    }
    return state.activeBuilding
}

function activateBuilding(state, buildingToActivate) {
    if(state.activeBuilding != buildingToActivate) {
        // save on localStorage
        localStorage.setItem(ACTIVE_BUILDING_KEY, buildingToActivate)
        state.activeBuilding = buildingToActivate
    }
}

export default {
    namespaced: true,
    state: {
        // retrieve selection from localStorage
        activeBuilding: localStorage.getItem(ACTIVE_BUILDING_KEY) || null,
        availableBuildings: []
    },
    getters: {
        activeBuilding: state => {
            return state.availableBuildings.find(building => building._id == state.activeBuilding);
        },
        buildings: state => state.availableBuildings
    },
    actions: {
        changeActiveBuilding({commit}, newBuilding) {
            commit(types.SET_ACTIVE_BUILDING, newBuilding);
        },
        fetchBuildings({commit}) {
            let userUid = store.getters.userProfile.firebase_uid;
            ApiBuilding.getAllOfUser(userUid).then(buildings => {
                commit(types.SET_AVAILABLE_BUILDING, buildings);
            });
        },
        createBuilding({ commit }, building) {
            return ApiBuilding.createBuilding(building).then(newBuilding => {
                commit(types.APPEND_AVAILABLE_BUILDING, newBuilding)
                return Promise.resolve();
            })
        },
        deactivateBuilding({ commit, state }, buildingId) {
            return ApiBuilding.deleteBuilding(buildingId).then(deleted => {
                let newAvailableBuildings = state.availableBuildings.filter(building => building._id != buildingId)
                commit(types.SET_AVAILABLE_BUILDING, newAvailableBuildings)
                return Promise.resolve()
            })
        }
    },
    mutations: {
        [types.SET_ACTIVE_BUILDING](state, buildingToActivate) {
            activateBuilding(state, buildingToActivate)
        },
        [types.SET_AVAILABLE_BUILDING](state, newAvailableBuildings) {
            state.availableBuildings = newAvailableBuildings
            activateBuilding(state, getDefaultActiveBuilding(state))
        },
        [types.APPEND_AVAILABLE_BUILDING](state, newBuilding) {
            state.availableBuildings.push(newBuilding)
            activateBuilding(state, getDefaultActiveBuilding(state))
        }
    }
};