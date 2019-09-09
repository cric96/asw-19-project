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
        return mockApi.query(() => true)
        // return apiService.get(resourceEndpoint, true) 
    }
}