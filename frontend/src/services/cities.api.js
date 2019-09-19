import { apiService } from './apiService'
import MockApiHelper from './mockApiHelper'

const resourceEndpoint = "/cities";

const mockApi = new MockApiHelper([
    {
        name: 'Cesena',
        country: 'Italy',
        link: '/cities/sadasdeasd'
    }
]);

export default {
    getAll : function(){
        return apiService.get(resourceEndpoint, false)
    },
    getAllFilter(queryFilter, limit = 5) {
        return apiService.get(resourceEndpoint, {filter: queryFilter, limit: limit})
    }
}