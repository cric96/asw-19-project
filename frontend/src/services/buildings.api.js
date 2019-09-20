import { apiService } from './apiService'

const resourceEndpoint = "/buildings"

export default {
    getAll: function() {
        return apiService.get(resourceEndpoint, null, true)
    },
    getAllOfUser: function(userUid) {
        return apiService.get(`/users/${userUid}/buildings`, null, true)
    },
    createBuilding: function(building) {
        return apiService.post(resourceEndpoint, building, null, true)
    },
    addMembers(buildingId, members) {
        return apiService.post(`/buildings/${buildingId}/members`, members, null, true)
    },
    deleteBuilding: function(buildingId) {
        return apiService.delete(`${resourceEndpoint}/${buildingId}`, true)
    }
}