import { apiService } from './apiService'

const ENDPOINT_USERS = "/users"
const ENDPOINT_USERS_ID = `${ENDPOINT_USERS}/{0}`

export default {
    createUser: function(user) {
        return apiService.post(ENDPOINT_USERS, user)
    },
    getUser : function(firebaseUid) {
        return apiService.get(ENDPOINT_USERS_ID.format(firebaseUid), null, true)
    },
    getAllUsers: function(filter = null, limit = 5) {
        return apiService.get(ENDPOINT_USERS, { filter: filter, limit: limit }, true)
    },
    updateUser : function(user) {
        return apiService.put(ENDPOINT_USERS_ID.format(user.firebase_uid), user, null, true)
    }
}
