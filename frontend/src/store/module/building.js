// import { ApiBuilding } from '@/services/mockApiBuilding'
import ApiBuilding from '@/services/buildings.api'
import * as types from '../mutationTypes'

const ACTIVE_BUILDING_KEY = 'activeBuilding' 

function setActiveAndAvailableBuilding(state, newAvailableBuildings) {
    state.availableBuildings = newAvailableBuildings;
    if(state.activeBuilding == null && newAvailableBuildings.length > 0) {
        state.activeBuilding = newAvailableBuildings[0].link;
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
            return state.availableBuildings.find(building => building.link == state.activeBuilding);
        },
        buildings: state => state.availableBuildings
    },
    actions: {
        changeActiveBuilding({commit}, newBuilding) {
            commit(types.SET_ACTIVE_BUILDING, newBuilding);
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
        [types.SET_ACTIVE_BUILDING](state, newBuilding) {
            if(state.activeBuilding != newBuilding) {
                // save on localStorage
                localStorage.setItem(ACTIVE_BUILDING_KEY, newBuilding)
                state.activeBuilding = newBuilding;
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