// import { ApiBuilding } from '@/services/mockApiBuilding'
import ApiBuilding from '@/services/buildings.api'
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
            ApiBuilding.getAll().then(buildings => {
                commit(types.SET_ACTIVE_AND_AVAILABLE_BUILDING, buildings);
            });
        },
        createBuilding({ commit }, building) {
            return ApiBuilding.createBuilding(building).then(newBuilding => {
                commit(types.APPEND_AVAILABLE_BUILDING, newBuilding);
                return Promise.resolve();
            }).catch(err => Promise.reject(err));
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
        },
        [types.APPEND_AVAILABLE_BUILDING](state, newBuilding) {
            state.availableBuildings.push(newBuilding);
            setActiveAndAvailableBuilding(state, state.availableBuildings);
        }
    }
};