import { ApiBuilding } from '@/services/mockApiBuilding'
import * as types from '../mutationTypes'

function setActiveAndAvailableBuilding(state, newAvailableBuildings) {
    state.availableBuildings = newAvailableBuildings;
    if(state.activeBuilding == null && newAvailableBuildings.length > 0) {
        state.activeBuilding = newAvailableBuildings[0];
    } 
}

export default {
    namespaced: true,
    state: {
        activeBuilding: null,
        availableBuildings: []
    },
    actions: {
        changeActiveBuilding({commit}, newBuilding) {
            commit(types.SET_ACTIVE_BUILDING, newBuilding);
        },
        fetchBuildings({commit}) {
            // TODO: replace it with an API service request, ex. with axios
            ApiBuilding.getAll().then(result => {
                commit(types.SET_ACTIVE_AND_AVAILABLE_BUILDING, result);
            });
        }
    },
    mutations: {
        [types.SET_ACTIVE_BUILDING](state, newBuilding) {
            if(state.activeBuilding != newBuilding) {
                state.activeBuilding = newBuilding;
            }
        },
        [types.SET_ACTIVE_AND_AVAILABLE_BUILDING](state, newAvailableBuildings) {
            setActiveAndAvailableBuilding(state, newAvailableBuildings);
        },
        [types.SET_AVAILABLE_BUILDING](state, newAvailableBuildings) {
            setActiveAndAvailableBuilding(state, newAvailableBuildings);
        }
    }
};