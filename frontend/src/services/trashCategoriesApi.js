import { apiService } from './apiService'

export default {
    getCategories : function(){
        return apiService.get(`/trashCategories`, null, false)
    }  
}
