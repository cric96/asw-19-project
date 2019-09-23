import { apiService } from './apiService'

const ENDPOINT_CITIES = "/cities";

export default {
    getAll : function(){
        return apiService.get(ENDPOINT_CITIES, false)
    },
    getAllFilter(queryFilter, limit = 5) {
        return apiService.get(ENDPOINT_CITIES, {filter: queryFilter, limit: limit})
    }
}