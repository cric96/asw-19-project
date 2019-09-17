import { apiService } from './apiService'

export default {
    createUser: function(user) {
        return apiService.post("/users", user)
    },
    getUser : function(firebaseUid) {
        return apiService.get(`/users/${firebaseUid}`, null, true)
    },
    getAllUsers: function(filter = null) {
        return apiService.get(`/users/`, { 'filter': filter }, true)
    },
    updateUser : function(user) {
        return apiService.put("/users", user, null, true)
    }
}
