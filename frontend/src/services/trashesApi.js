import { apiService } from './apiService'

export default {
    insertTrash: function(buildingId, trashCategory) {
        return apiService.post(`/buildings/${buildingId}/trashes`, trashCategory, null, true)
    }
}