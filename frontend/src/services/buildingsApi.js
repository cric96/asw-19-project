import { apiService } from './apiService'

const ENDPOINT_BUILDINGS = "/buildings"
const ENDPOINT_BUILDINGS_OF_USER = "/users/{0}/buildings"
const ENDPOINT_BUILDINGS_ID = `${ENDPOINT_BUILDINGS}/{0}`
const ENDPOINT_BUILDINGS_MEMBERS = `${ENDPOINT_BUILDINGS_ID}/members`
const ENDPOINT_BUILDINGS_MEMBER = `${ENDPOINT_BUILDINGS_MEMBERS}/{1}`

export default {
    getAll: function() {
        return apiService.get(ENDPOINT_BUILDINGS, null, true)
    },
    getAllOfUser: function(userUid) {
        return apiService.get(ENDPOINT_BUILDINGS_OF_USER.format(userUid), null, true)
    },
    createBuilding: function(building) {
        return apiService.post(ENDPOINT_BUILDINGS, building, null, true)
    },
    updateBuilding: function(building) {
        return apiService.put(ENDPOINT_BUILDINGS_ID.format(building._id), building, null, true)
    },
    addMembers(buildingId, members) {
        return apiService.post(ENDPOINT_BUILDINGS_MEMBERS.format(buildingId), members, null, true)
    },
    removeMember(buildingId, memberId) {
        return apiService.delete(ENDPOINT_BUILDINGS_MEMBER.format(buildingId, memberId), true)
    },
    deleteBuilding: function(buildingId) {
        return apiService.delete(ENDPOINT_BUILDINGS_ID.format(buildingId), true)
    }
}