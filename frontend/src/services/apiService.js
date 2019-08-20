import axios from 'axios'
import store from '../store/store'

class ApiService {

    constructor(baseURL){
        this.baseURL = baseURL
    }

    getHeader() {
        let token = store.getters.token;
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
    }

    get(resource, requireAuth = false) {
        return axios.get(this.baseURL+ resource, requireAuth ? this.getHeader() : {})
    }

    post(resource, data, requireAuth= false) {
        return axios.post(this.baseURL+resource, requireAuth ? this.getHeader() : {}, data)
    }

    put(resource, data, requireAuth= false) {
        return axios.put(this.baseURL+resource, requireAuth ? this.getHeader() : {}, data)
    }

    delete(resource, requireAuth = false) {
        return axios.delete(this.baseURL+ resource, requireAuth ? this.getHeader() : {})
    }

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
    customRequest(data) {
        return axios(data)
    }
}

export default ApiService