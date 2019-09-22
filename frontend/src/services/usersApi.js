import { apiService } from './apiService'

export default {
    createUser: function(user) {
        return apiService.post("/users", user)
    },
    getUser : function(firebaseUid) {
        return apiService.get(`/users/${firebaseUid}`, null, true)
    },
    getAllUsers: function(filter = null, limit = 5) {
        return apiService.get(`/users/`, { filter: filter, limit: limit }, true)
    },
    updateUser : function(user) {
        return apiService.put(`/users/${user.firebase_uid}`, user, null, true)
    }
}
