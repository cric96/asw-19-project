// import { ApiBuilding } from '@/services/mockApiBuilding'
import ApiBuilding from '@/services/buildingsApi'
import ApiBin from "@/services/binsApi"
import * as types from '../mutationTypes'
import store from '../store'
import Notification from "@/model/notification"
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
                    newBuilding.members.unshift(building.owner)
                    commit(types.APPEND_AVAILABLE_BUILDING, newBuilding)
                })
            )
        },
        updateBuilding({ commit, state }, building) {
            let oldMembers = state.availableBuildings.find(current => current._id == building._id).members
            let [toAdd, toRemove] = computeDiff(building.members.map(m => m.firebase_uid), oldMembers.map(m => m.firebase_uid))
            
            return ApiBuilding.updateBuilding(building)
                .then(updatedBuilding => addMembers(updatedBuilding, toAdd))
                .then(updatedBuilding => removeMembers(updatedBuilding, toRemove))
                .then(updatedBuilding => {
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
            if(!getters.activeBuilding) {
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
        SOCKET_newBuilding({dispatch}) {
            var msg = new Notification("Nuovo edificio!").setTo("/buildings")
            this.dispatch('msg/addMessage', msg) //show notification
            dispatch("fetchBuildings")
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

function addMembers(building, membersToAdd) {
    if(membersToAdd.length > 0) {
        return ApiBuilding.addMembers(building._id, membersToAdd).then(newMembers => {
            building.members = building.members.concat(newMembers)
            return building
        })
    }
    return Promise.resolve(building)
}

function removeMembers(building, membersToRemove) {
    if(membersToRemove.length > 0) {
        let promises = membersToRemove.map(memberUid => ApiBuilding.removeMember(building._id, memberUid))
        Promise.all(promises)
            .then(() => {
                building.members = building.members.removeIf(m => membersToRemove.includes(m.firebase_uid))
                return building
            })
    }
    return Promise.resolve(building)
}

/**
 * Compute the difference between two array. 
 * What element are present in excess to array1 and 
 * what element are missing 
 */
function computeDiff(array1, array2) {
    let diff1 = array1.filter(elem => !array2.includes(elem))
    let diff2 = array2.filter(elem => !array1.includes(elem))
    return [diff1, diff2]
}

Array.prototype.removeIf = function(condition) {
    return this.filter(elem => !condition(elem))
}