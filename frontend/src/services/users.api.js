import { apiService } from './apiService'

export default {
    create_user: function(user){
        return apiService.post("/users", user)
    },
    get_user : function(){
        return apiService.get("/users", true) 
    },
    update_user : function(user){
        return apiService.put("/users",user, true) 
    }
}
