import { apiService } from './apiService'
import MockApiHelper from './mockApiHelper'

const resourceEndpoint = "/cities";

const mockApi = new MockApiHelper([
    {
        _id: "sadasdeasd",
        name: 'Cesena',
        country: 'Italy'
    }
]);

export default {
    getAll : function(){
        return mockApi.query(() => true)
        // return apiService.get(resourceEndpoint, true) 
    }
}