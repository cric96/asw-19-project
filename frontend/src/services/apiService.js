import axios from 'axios'
import store from '../store/store'

function makeRequest(resource, axiosFunction, authorization = false, body = undefined) {
    let headers = authorization ? getHeader() : { };
    if(body != undefined) {
        return axiosFunction(resource, body, headers);
    } else {
        return axiosFunction(resource, headers);
    }
}

function getHeader() {
    let token = store.getters.token;
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
}

class ApiService {
    
    constructor(baseURL = ""){
        this.axios = axios.create({
            baseURL: baseURL
        });
    }

    get(resource, requireAuth = false) {
        return makeRequest(resource, this.axios.get, requireAuth)
    }

    post(resource, data, requireAuth= false) {
        return makeRequest(resource, this.axios.post, requireAuth, data);
    }

    put(resource, data, requireAuth= false) {
        return makeRequest(resource, this.axios.put, requireAuth, data);
    }

    delete(resource, requireAuth = false) {
        return makeRequest(resource, this.axios.delete, requireAuth);
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