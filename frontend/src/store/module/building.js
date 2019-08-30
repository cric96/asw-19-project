import { ApiBuilding } from '@/services/mockApiBuilding'
import * as types from '../mutationTypes'

function setActiveAndAvailableBuilding(state, newAvailableBuildings) {
    state.availableBuildings = newAvailableBuildings;
    if(state.activeBuildingId == null && newAvailableBuildings.length > 0) {
        state.activeBuildingId = newAvailableBuildings[0]._id;
    } 
}

export default {
    namespaced: true,
    state: {
        activeBuildingId: null,
        availableBuildings: []
    },
    getters: {
        activeBuilding: state => {
            return state.availableBuildings.find(building => building._id == state.activeBuildingId);
        },
        buildings: state => state.availableBuildings
    },
    actions: {
        changeActiveBuildingId({commit}, newBuildingId) {
            commit(types.SET_ACTIVE_BUILDING, newBuildingId);
        },
        fetchBuildings({commit}) {
            // TODO: replace it with an API service request, ex. with axios
            ApiBuilding.getAll().then(result => {
                commit(types.SET_ACTIVE_AND_AVAILABLE_BUILDING, result);
            });
        }
    },
    mutations: {
        [types.SET_ACTIVE_BUILDING](state, newBuildingId) {
            if(state.activeBuildingId != newBuildingId) {
                state.activeBuildingId = newBuildingId;
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