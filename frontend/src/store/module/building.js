// import { ApiBuilding } from '@/services/mockApiBuilding'
import ApiBuilding from '@/services/buildingsApi'
import ApiBin from "@/services/binsApi";
import * as types from '../mutationTypes'
import store from '../store'
//TODO refactor, rimuovi la logica dei bin da qua, usa un'altro file
/**
 * manage building selection and user buildings state.
 */
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
        availableBuildings: [],
        fetchingBuilding: false
    },
    getters: {
        activeBuilding: state => {
            return state.availableBuildings.find(building => building._id == state.activeBuilding);
        },
        buildings: state => state.availableBuildings,
        buildingsIsLoading: state => state.fetchingBuilding,
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
        fetchBuildings({ commit, state }) {
            let currentUser = store.getters['user/userProfile']
            if(currentUser) {
                state.fetchingBuilding = true
                ApiBuilding.getAllOfUser(currentUser.firebase_uid).then(buildings => {
                    commit(types.SET_AVAILABLE_BUILDING, buildings)
                }).finally(() => state.fetchingBuilding = false)
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
        updateBuilding({ commit, state }, building) {
            let oldMembers = state.availableBuildings.find(current => current._id == building._id).members
            let [toAdd, toRemove] = computeDiff(building.members.map(m => m.firebase_uid), oldMembers.map(m => m.firebase_uid))
            // create the promise associate to add of members
            let promiseAdd = toAdd.length == 0 ? Promise.resolve([]) : ApiBuilding.addMembers(building._id, toAdd)
            // create the promise associate to remove of members
            let promiseRemove = toRemove.length == 0 ? Promise.resolve() : Promise.all(toRemove.map(uid => ApiBuilding.removeMember(building._id, uid)))
            
            return ApiBuilding.updateBuilding(building).then(updatedBuilding => {
                return promiseAdd.then(newMembers => {
                    updatedBuilding.members = updatedBuilding.members.concat(newMembers)
                    return promiseRemove.then(() => updatedBuilding)
                })
            })
            .then(updatedBuilding => {
                // remove members from local copy
                updatedBuilding.members = updatedBuilding.members.removeIf(m => toRemove.includes(m.firebase_uid))
                commit(types.UPDATE_BUILDING, updatedBuilding)
                return updatedBuilding
            })
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
        SOCKET_newTrash({getters}, {categoryName}) {
            var bin = getters.binFromTrashCategoryName(categoryName)
            var collectedTrash = bin.collectedTrashes.find(trash => trash.trashCategory.name === categoryName)
            collectedTrash.quantity ++
            bin.totalQuantity ++
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
            // vuex not trigger the "observers" updating only one specific building
            // need to re-assign the buildings array with a new one
            let newBuildings = state.availableBuildings.map(x => x)
            newBuildings[index] = updateBuilding
            state.availableBuildings = newBuildings
        },
        [types.SET_BINS_IN_ACTIVE_BUILDING](state, bins) {
            state.bins = bins
        }
    }
};

/**
 * Compute the difference between two array. 
 * What element are present in excess to array1 and 
 * what element are missing  
 * @param {*} array1 
 * @param {*} array2 
 * @returns Array Array of two arrays, the first one contains
 */
function computeDiff(array1, array2) {
    let diff1 = array1.filter(elem => !array2.includes(elem))
    let diff2 = array2.filter(elem => !array1.includes(elem))
    return [diff1, diff2]
}

Array.prototype.removeIf = function(condition) {
    return this.filter(elem => !condition(elem))
}