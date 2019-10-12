import { apiService } from './apiService'

export default {
    getRewards : function(){
        return apiService.get(`/rewards`, null, false)
    }  
}
