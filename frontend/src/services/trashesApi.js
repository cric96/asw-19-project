import { apiService } from './apiService'

export default {
    insertTrash: function(buildingId, trashCategory) {
        return apiService.post(`/buildings/${buildingId}/trashes`, trashCategory, null, true)
    },
    getUserTrashes : function({firebase_uid}) {
        return apiService.get(`/users/${firebase_uid}/trashes`, null, true)    
    }
}