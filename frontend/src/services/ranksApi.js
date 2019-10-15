import { apiService } from './apiService'
///HOW TO DO ??
export default {
    getRank : function(){
        return apiService.get(`/ranks/users/?orderBy=score&sort=desc`, null, true)
    }  
}
