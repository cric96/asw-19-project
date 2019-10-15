// import { ApiBuilding } from '@/services/mockApiBuilding'
import ApiBuilding from '@/services/buildingsApi'
import ApiBin from "@/services/binsApi";
import * as types from '../mutationTypes'
import store from '../store'

const ACTIVE_BUILDING_KEY = 'activeBuilding' 

function getDefaultActiveBuilding(state) {
    if((state.activeBuilding == null && state.availableBuildings.length > 0) ||
        !state.availableBuildings.map(building => building._id).includes(state.activeBuilding)) {
            let firstBuilding = state.availableBuildings[0]
            return (!firstBuilding) ? null : firstBuilding._id
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
        bins : [],
        availableBuildings: []
    },
    getters: {
        activeBuilding: state => {
            return state.availableBuildings.find(building => building._id == state.activeBuilding);
        },
        buildings: state => state.availableBuildings,
        bins: state => state.bins,
        binFromTrashCategoryName: (state) => (trashCategory) => {
            var sameCategory = collectedTrash => collectedTrash.trashCategory.name === trashCategory
            return state.bins.find(bin => bin.collectedTrashes.find(sameCategory))
        }
    },
    actions: {
        changeActiveBuilding({commit, getters}, newBuilding) {
            if(getters.activeBuilding !== null) {
                this.emitOnSocket("leaveBuilding", getters.activeBuilding._id)
            }
            commit(types.SET_ACTIVE_BUILDING, newBuilding)
        },
        fetchBuildings({commit}) {
            let currentUser = store.getters['auth/userProfile']
            if(currentUser) {
                ApiBuilding.getAllOfUser(currentUser.firebase_uid).then(buildings => {
                    commit(types.SET_AVAILABLE_BUILDING, buildings);
                })
            }
        },
        createBuilding({ commit }, building) {
            return ApiBuilding.createBuilding(building).then(newBuilding => 
                ApiBuilding.addMembers(newBuilding._id, building.members).then(addedMembers => {
                    newBuilding.members = addedMembers
                    commit(types.APPEND_AVAILABLE_BUILDING, newBuilding)
                })
            )
        },
        deactivateBuilding({ commit, state }, buildingId) {
            return ApiBuilding.deleteBuilding(buildingId).then(() => {
                let newAvailableBuildings = state.availableBuildings.filter(building => building._id != buildingId)
                commit(types.SET_AVAILABLE_BUILDING, newAvailableBuildings)
                return Promise.resolve()
            })
        },
        fetchBinsOfActiveBuilding({ commit, getters }) {
            if(getters.activeBuilding === null) {
                return Promise.reject("No active building")
            } else {
                //join the building room for socket updates
                this.emitOnSocket("joinBuilding", getters.activeBuilding._id)
                return ApiBin.getBins(getters.activeBuilding)
                    .then(bins => commit(types.SET_BINS_IN_ACTIVE_BUILDING, bins))
            }
        },
        SOCKET_newTrash({getters}, trashCategoryName) {
            var bin = getters.binFromTrashCategoryName(trashCategoryName)
            var collectedTrash = bin.collectedTrashes.find(trash => trash.trashCategory.name === trashCategoryName)
            collectedTrash.quantity++
        },
        addMember({ commit }, { buildingId, users}) {
            return ApiBuilding.addMember(buildingId, users).then(updateBuilding => {
                commit(types.UPDATE_BUILDING, updateBuilding)
            })
        },
        // TODO: manage error for each module, like auth
        removeMember({ state, commit }, { buildingId, memberId }) {
            return ApiBuilding.removeMember(buildingId, memberId).then(() => {
                let index = state.availableBuildings.findIndex(building => building._id == buildingId)
                let updatedBuilding = state.availableBuildings[index]
                updatedBuilding.members.splice(index, 1)
                commit(types.UPDATE_BUILDING, updatedBuilding)
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
        },
        [types.UPDATE_BUILDING](state, updateBuilding) {
            let index = state.availableBuildings.findIndex(building => building._id == updateBuilding._id)
            state.availableBuildings[index] = updateBuilding
        },
        [types.SET_BINS_IN_ACTIVE_BUILDING](state, bins) {
            state.bins = bins
        }
    }
};