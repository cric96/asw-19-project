import { apiService } from './apiService'

const resourceEndpoint = "/buildings"

export default {
    getAll: function() {
        return apiService.get(resourceEndpoint, null, true)
    },
    createBuilding: function(building) {
        return apiService.post(resourceEndpoint, building, null, true)
    }
}