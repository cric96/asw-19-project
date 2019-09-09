import { apiService } from './apiService'

const resourceEndpoint = "/buildings";

export default {
    getAll: function() {
        return apiService.get(resourceEndpoint, true);
    },
    createBuilding: function(building) {
        return apiService.post(resourceEndpoint, building, true);
    }
}