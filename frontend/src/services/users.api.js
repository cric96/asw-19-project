import ApiService from './apiService'

// TODO: change the base url, retrieving it from .env
let apiService = new ApiService("http://localhost:3000/api");

export default{
    create_user: function(user){
        return apiService.post("/users",user)
    },
    get_user : function(){
        return apiService.get("/users", true) 
    },
    update_user : function(user){
        return apiService.put("/users",user, true) 
    }
}
