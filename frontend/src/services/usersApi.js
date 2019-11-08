import { apiService } from './apiService'

const ENDPOINT_USERS = "/users"
const ENDPOINT_USERS_ID = `${ENDPOINT_USERS}/{0}`
const ENDPOINT_USERS_PICTURE = `${ENDPOINT_USERS}/{0}/picture`

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
    },
    insertPicture : function(image, firebaseUid) {
        return apiService.postImage(ENDPOINT_USERS_PICTURE.format(firebaseUid),image, null, true)
    },
    isPicturePresent : function(firebase_uid) {
        return apiService.head(ENDPOINT_USERS_PICTURE.format(firebase_uid), null, false)
    }
}
